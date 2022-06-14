from mysqlconnection import connectToMySQL
from flask import flash
class Car:
    def __init__( self , data ):
        self.id = data['carid']
        self.make = data['make']
        self.model = data['model']
        self.year = data['year']
        self.description = data['description']
        self.price = data['price']
        self.users_id = data['users_id']

    @classmethod
    def get_all(cls):
        query = "SELECT * FROM cars.car;"

        results = connectToMySQL('cars').query_db(query)

        carList = []

        for cars in results:
            carList.append( Car(cars) )
        
        
        return carList

    @classmethod
    def save(cls, data ):
        query = "INSERT INTO cars.car ( make , model, year, description, price, users_id ) VALUES ( %(make)s , %(model)s, %(year)s, %(description)s, %(price)s, %(user_id)s );"

        return connectToMySQL('cars').query_db( query, data )

    @classmethod
    def delete(cls, id ):
        query = "DELETE FROM cars.car WHERE carid="
        query = query + id + ";"
        print("/////////////////////////////////////////////", id)

        return connectToMySQL('cars').query_db( query )

    @classmethod
    def update(cls, id, data ):
        query = "UPDATE cars.car "
        query = query + "SET make = %(make)s, make = %(model)s, model = %(model)s, year = %(year)s, description = %(description)s, price = %(price)s"
        query = query + " WHERE carid=" + id + ";"
        print(query)

        return connectToMySQL('cars').query_db( query, data )

    @classmethod
    def disableChecks(cls):
        query = "SET FOREIGN_KEY_CHECKS = 0;"
        print(query)

        return connectToMySQL('cars').query_db( query )


