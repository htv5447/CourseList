from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class ExampleApi(Resource):
    def get(self):
    # NOTE: No need to replicate code; use the util function!
       result = exec_get_one("SELECT COUNT(*) FROM courses");
       return result

class TestMessage(Resource):
    def get(self):
        return "Modal components can use onOpened to fetch data dynamically!"

class GetAllCourses(Resource):
    def get(self):
        result = exec_get_all("SELECT courses.id,courses.name,courses.c_desc, courses.details, department.name, college.name FROM ((college INNER JOIN department ON college.id = department.college_id) INNER JOIN courses ON courses.dept_id = department.id)")
        data = []
        for i in result:
            data.append({"id" : i[0], "name" : i[1], "c_desc" : i[2], "details" : i[3], "department" : i[4], "college": i[5]})
        return data

class GetDepartment(Resource):
    def get(self):
        result = exec_get_all("SELECT id,name FROM department")
        data = []
        for i in result:
            data.append({"id" : i[0], "department" : i[1]})
        return data

class EditCourse(Resource):
    def put(self,id):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('c_desc')
        parser.add_argument('details')
        parser.add_argument('department')
        args = parser.parse_args()
        result = exec_get_one("SELECT id FROM department WHERE name= %s",[str(args['department'])])
        exec_commit("UPDATE courses SET name = %s, c_desc=%s, details=%s, dept_id = %s WHERE id = %s",[str(args['name']),str(args['c_desc']),str(args['details']),str(result[0]),str(id)])

class AddCourse(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('c_desc')
        parser.add_argument('details')
        parser.add_argument('department')
        args = parser.parse_args()
        result = exec_get_one("SELECT id FROM department WHERE name= %s",[str(args['department'])])
        exec_commit("INSERT INTO courses(name, c_desc, details, selected, dept_id) VALUES (%s,%s,%s,FALSE,%s)",[str(args['name']),str(args['c_desc']),str(args['details']),str(result[0])])

class GetCourse(Resource):
    def get(self,id):
        result = exec_get_one("SELECT * FROM courses WHERE id = %s",[str(id)])
        return result