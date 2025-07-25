from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy 
import secrets 
import pickle
import numpy as np


# Load model
with open("ML Model/catboost_all_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

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
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'))
    gender = db.Column(db.String(30))
    height = db.Column(db.Float())
    weight = db.Column(db.Float())
    cholesterolLevel = db.Column(db.Float())
    BMI = db.Column(db.Float())
    BloodGlucoseLevel = db.Column(db.Float())
    BoneDensity = db.Column(db.Float())
    VisionSharpness = db.Column(db.Float())
    HearingAbility = db.Column(db.Float())
    physicalActivity = db.Column(db.String(30))
    smokingStatus = db.Column(db.String(30))
    alcoholConsumption = db.Column(db.String(30))
    Diet = db.Column(db.String(30))
    ChronicDiseases = db.Column(db.String(30))
    MedicationUse = db.Column(db.String(30))
    FamilyHistory = db.Column(db.String(30))
    CognitiveFunction = db.Column(db.Float())
    MentalHealth = db.Column(db.String(30))
    SleepPattern = db.Column(db.String(30))
    StressLevel = db.Column(db.Float())
    PollutionExposure = db.Column(db.Float())
    SunExposure = db.Column(db.Float())
    EducationLevel = db.Column(db.String(30))
    IncomeLevel = db.Column(db.String(30))
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
        else:
            return "Invalid credentials. Please try again."
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return redirect(url_for('home'))

@app.route('/bio-input', methods=['GET', 'POST'])
def bio_input():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        user_id = session.get('user_id')
        
        new_feature = Features(
            userID=user_id,
            gender=request.form.get('gender'),
            height=request.form.get('height'),
            weight=request.form.get('weight'),
        )
        
        db.session.add(new_feature)
        db.session.commit()
        
        session['feature_id'] = new_feature.featureID
        return redirect(url_for('input_data'))
    
    return render_template("bio_input.html")


@app.route('/input-data', methods=['GET', 'POST'])
def input_data():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        # Get all health data from form
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
        systolic = request.form.get('systolic')
        diastolic = request.form.get('diastolic')
        
        # Update the existing Features record for this user
        features = Features.query.filter_by(userID=session['user_id']).first()
        if features:
            features.cholesterolLevel = float(cholesterol) if cholesterol else None
            features.BMI = float(bmi) if bmi else None
            features.BloodGlucoseLevel = float(glucose) if glucose else None
            features.BoneDensity = float(bone_density) if bone_density else None
            features.VisionSharpness = float(vision) if vision else None
            features.HearingAbility = float(hearing) if hearing else None
            features.CognitiveFunction = float(cognitive) if cognitive else None
            features.StressLevel = float(stress) if stress else None
            features.PollutionExposure = float(pollution) if pollution else None
            features.SunExposure = float(sun) if sun else None
            features.Systolic = float(systolic) if systolic else None
            features.Diastolic = float(diastolic) if diastolic else None
            
            db.session.commit()
        
        return redirect(url_for('test'))
    return render_template("input_data.html")

@app.route('/test', methods=['GET', 'POST'])
def test():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        activity = request.form.get('activity')
        smoking = request.form.get('smoking')
        alcohol = request.form.get('alcohol')
        diet = request.form.get('diet')
        chronic = request.form.get('chronic')
        medication = request.form.get('medication')
        family = request.form.get('family')
        mental = request.form.get('mental') 
        sleep = request.form.get('sleep')
        education = request.form.get('education')
        income = request.form.get('income')

        features = Features.query.filter_by(userID=session['user_id']).first()
        if features:
            features.physicalActivity = str(activity) if activity else None
            features.smokingStatus = str(smoking) if smoking else None
            features.alcoholConsumption = str(alcohol) if alcohol else None
            features.Diet = str(diet) if diet else None
            features.ChronicDiseases = str(chronic) if chronic else None
            features.MedicationUse = str(medication) if medication else None
            features.FamilyHistory = str(family) if family else None
            features.MentalHealth = str(mental) if mental else None
            features.SleepPattern = str(sleep) if sleep else None
            features.EducationLevel = str(education) if education else None
            features.IncomeLevel = str(income) if income else None

            db.session.commit()    
        
        return redirect(url_for('result_with_id', feature_id=features.featureID))
    return render_template("test.html")


@app.route('/submit', methods=['POST'])
def submit():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user_id = session['user_id']

    features = Features(
        userID=user_id,
        gender=request.form.get('gender'),
        height=float(request.form.get('height')),
        weight=float(request.form.get('weight')),
        cholesterolLevel=float(request.form.get('cholesterolLevel')),
        BMI=float(request.form.get('BMI')),
        BloodGlucoseLevel=float(request.form.get('BloodGlucoseLevel')),
        BoneDensity=float(request.form.get('BoneDensity')),
        VisionSharpness=float(request.form.get('VisionSharpness')),
        HearingAbility=float(request.form.get('HearingAbility')),
        physicalActivity=request.form.get('physicalActivity'),
        smokingStatus=request.form.get('smokingStatus'),
        alcoholConsumption=request.form.get('alcoholConsumption'),
        Diet=request.form.get('Diet'),
        ChronicDiseases=request.form.get('ChronicDiseases'),
        MedicationUse=request.form.get('MedicationUse'),
        FamilyHistory=request.form.get('FamilyHistory'),
        CognitiveFunction=request.form.get('CognitiveFunction'),
        MentalHealth=request.form.get('MentalHealth'),
        SleepPattern=request.form.get('SleepPattern'),
        StressLevel=float(request.form.get('StressLevel')),
        PollutionExposure=float(request.form.get('PollutionExposure')),
        SunExposure=float(request.form.get('SunExposure')),
        EducationLevel=request.form.get('EducationLevel'),
        IncomeLevel=request.form.get('IncomeLevel'),
        Systolic=float(request.form.get('Systolic')),
        Diastolic=float(request.form.get('Diastolic'))
    )

    db.session.add(features)
    db.session.commit()

    return redirect(url_for('result_with_id', feature_id=features.featureID))


@app.route('/result/<int:feature_id>')
def result_with_id(feature_id):
    features = Features.query.get(feature_id)

    if not features:
        return "Feature not found", 404

    input_data = [
        features.gender,
        features.height,
        features.weight,
        features.cholesterolLevel,
        features.BMI,
        features.BloodGlucoseLevel,
        features.BoneDensity,
        features.VisionSharpness,
        features.HearingAbility,
        features.physicalActivity,
        features.smokingStatus,
        features.alcoholConsumption,
        features.Diet,
        features.ChronicDiseases,
        features.MedicationUse,
        features.FamilyHistory,
        features.CognitiveFunction,
        features.MentalHealth,
        features.SleepPattern,
        features.StressLevel,
        features.PollutionExposure,
        features.SunExposure,
        features.EducationLevel,
        features.IncomeLevel,
        features.Systolic,
        features.Diastolic
    ]

    if any(val is None for val in input_data):
        return "Incomplete data for prediction", 400

    predicted_age = model.predict([input_data])[0]

    return render_template(
        'result.html',
        predicted_age=round(predicted_age, 1),
        bmi=features.BMI,
        cholesterol=features.cholesterolLevel,
        blood_pressure=f"{features.Systolic}/{features.Diastolic}",
        activity_level=features.physicalActivity
    )


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)