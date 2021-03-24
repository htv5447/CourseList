from flask import Flask
from flask_restful import Resource, Api


from api.swen_344_db_utils import *
from api.example_api import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(ExampleApi,'/example_api')
api.add_resource(TestMessage, '/test_message')
api.add_resource(GetAllCourses,'/coursedata')
api.add_resource(EditCourse,'/coursedata/<id>')
api.add_resource(GetDepartment,'/department')
api.add_resource(AddCourse,'/coursedata/')
api.add_resource(GetCourse,'/coursedata/<id>')

if __name__ == '__main__':
    print("Loading db");
    exec_sql_file('react4_schema.sql');
    print("Starting flask");
    app.run(debug=True), #starts Flask



    