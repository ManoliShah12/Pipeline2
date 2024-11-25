from flask import Flask, render_template, redirect, url_for, request, flash, session, Response
from werkzeug.security import generate_password_hash, check_password_hash
from cryptography.fernet import Fernet
from models import db, User, Case

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chain_of_custody.db'
app.config['SECRET_KEY'] = 'your_secret_key'

# Use a static encryption key
ENCRYPTION_KEY = b'zc9L7yIb2zLCYcloqZCdDf7GnTbyOEYB26-V9BOJ-Y4='  
cipher_suite = Fernet(ENCRYPTION_KEY)

db.init_app(app)

# Create tables on the first run
with app.app_context():
    db.create_all()

# User registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']

        if User.query.filter_by(email=email).first():
            flash("Email is already registered!", "error")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(name=name, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful! Please log in.", "success")
        return redirect(url_for('login'))
    return render_template('register.html')


# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['role'] = user.role
            return redirect(url_for('dashboard'))
        flash("Invalid email or password!", "error")
    return render_template('login.html')


# User dashboard
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    cases = Case.query.all() if session['role'] == 'admin' else Case.query.filter_by(added_by=session['user_id']).all()
    return render_template('dashboard.html', cases=cases, role=session['role'])


# Add a case (admin or user)
@app.route('/add-case', methods=['GET', 'POST'])
def add_case():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        file = request.files['file']

        if file:
            encrypted_data = cipher_suite.encrypt(file.read())
            new_case = Case(
                name=name,
                description=description,
                encrypted_data=encrypted_data,
                added_by=session['user_id']
            )
            db.session.add(new_case)
            db.session.commit()
            flash("Case added successfully!", "success")
            return redirect(url_for('dashboard'))

    return render_template('add_case.html')


# View an encrypted case (decrypted content displayed on-screen)
@app.route('/view-case/<int:case_id>', methods=['GET', 'POST'])
def view_case(case_id):
    case = Case.query.get(case_id)

    if not case:
        flash("Case not found!", "error")
        return redirect(url_for('dashboard'))

    if session['role'] != 'admin' and case.added_by != session['user_id']:
        flash("You don't have permission to access this case!", "error")
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        password = request.form['password']
        user = User.query.get(session['user_id'])
        if check_password_hash(user.password, password):
            decrypted_content = cipher_suite.decrypt(case.encrypted_data)
            content_type = "text/plain"
            if case.name.endswith(('.jpg', '.png','.txt')):
                content_type = "image/jpeg"
            return Response(decrypted_content, content_type=content_type)

        flash("Incorrect password!", "error")
    return render_template('view_case.html', case=case)


# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
