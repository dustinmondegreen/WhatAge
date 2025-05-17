from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy 
import secrets 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.secret_key = secrets.token_hex(32)  # Secure random key
db = SQLAlchemy(app)

class User(db.Model):
    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.String(100), nullable=False)
    userEmail = db.Column(db.String(120), unique=True, nullable=False)
    UserPassword = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Current user is {self.userName}>"

class Features(db.Model):
    featureID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'), foreign_key=True)
    gender = db.Column(db.String(30))
    height = db.Column(db.Float())
    weight = db.Column(db.Float())
    cholestorLevel = db.Column(db.Float())
    BMI = db.Column(db.Float())
    BloodGlucoseLevel = db.Column(db.Float())
    BoneDensity = db.Column(db.Float())
    VisionSharpness = db.Column(db.Float())
    HearingAbility = db.Column(db.Float())
    physicalActivity = db.Column(db.String(30))
    smokingStatus = db.Column(db.String(30))
    alchoholConsumption = db.Column(db.String(30))
    Diet = db.Column(db.String(30))
    ChronicDiseases = db.Column(db.String(30))
    MedicationUse = db.Column(db.String(30))
    FamilyHistory = db.Column(db.String(30))
    CognitiveFunction = db.Column(db.Float())
    MentalHealth = db.Column(db.String(30))
    SleepPattern = db.Column(db.String(30))
    StressLevel = db.Column(db.Float(30))
    PollutionExposure = db.Column(db.Float())
    SunExposure = db.Column(db.Float())
    EducationLevel = db.Column(db.String(30))
    IncomeLevel = db.Column(db.String(30))
    Age = db.Column(db.Integer)
    Systolic = db.Column(db.Float())
    Diastolic = db.Column(db.Float())


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
            session['user_id'] = user.userID  # Store user ID in session
            session['user_name'] = user.userName  # Store user name in session
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return redirect(url_for('home'))

@app.route('/bio-input', methods=['GET', 'POST'])
def bio_input():
    if request.method == 'POST':
        # Simpan data bio jika diperlukan
        # contoh: session['bio_data'] = request.form
        return redirect(url_for('input_data'))
    return render_template("bio_input.html")

@app.route('/input-data', methods=['GET', 'POST'])
def input_data():
    if request.method == 'POST':
        # Simpan data measurements jika diperlukan
        cholesterol = request.form.get('cholesterol')
        bmi = request.form.get('bmi')
        glucose = request.form.get('glucose')
        bone_density = request.form.get('bone_density')
        vision = request.form.get('vision')
        hearing = request.form.get('hearing')
        cognitive = request.form.get('cognitive')
        stress = request.form.get('stress')
        pollution = request.form.get('pollution')
        sun = request.form.get('sun')

        new_features = Features(
            cholestorLevel=float(cholesterol),
            BMI=float(bmi),
            BloodGlucoseLevel=float(glucose),
            BoneDensity=float(bone_density),
            VisionSharpness=float(vision),
            HearingAbility=float(hearing),
            CognitiveFunction=float(cognitive),
            StressLevel=float(stress),
            PollutionExposure=float(pollution),
            SunExposure=float(sun)
        )
        db.session.add(new_features)
        db.session.commit()
        return redirect(url_for('test'))
    return render_template("input_data.html")

@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        return render_template('result.html')
    return render_template('result.html')

@app.route('/result', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        return render_template('result.html')
    return render_template('result.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

