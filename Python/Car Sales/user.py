from mysqlconnection import connectToMySQL
from flask import flash
class User:
    def __init__( self , data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']

    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL('cars').query_db(query)
        usersList = []
        for users in results:
            usersList.append( User(users) )
        
        return usersList

    @classmethod
    def save(cls, data ):
        query = "INSERT INTO cars.users ( first_name , last_name , email, password ) VALUES ( %(first_name)s , %(last_name)s , %(email)s , %(password)s );"
        return connectToMySQL('cars').query_db( query, data )

    @classmethod
    def delete(cls, id ):
        #query = "DELETE FROM cars.users WHERE id="
        #query = query + id + ";"
        query = "SELECT * FROM cars.car;"
        print("/////////////////////////////////////////////", id)
        return connectToMySQL('cars').query_db( query )


    @staticmethod
    def validate_pw(pw, confPw):
        is_valid = True
        if (pw != confPw):
            is_valid = False
        return is_valid


