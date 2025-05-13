from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

class User(db.Model):
    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.String(100), nullable=False)
    userEmail = db.Column(db.String(120), unique=True, nullable=False)
    UserPassword = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Current user is {self.userName}>"

@app.route('/')
def home():
    return render_template("zero.html")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        existing_user = User.query.filter_by(userEmail=email).first()
        if existing_user:
            return "Error: Email already registered. Please use a different email."

        new_user = User(
            userName=name,
            userEmail=email,
            UserPassword=password
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(userEmail=email, UserPassword=password).first()
        if user:
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/test')
def test():
    return render_template('test.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)