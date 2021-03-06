from server.bo.Participation import Participation
from server.db.Mapper import Mapper


class ParticipationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, creation_time, project, student FROM participation")
        tuples = cursor.fetchall()

        for (id, creation_time, project, student) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_time(creation_time)
            participation.set_project(project)
            participation.set_student(student)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_time, project, student FROM participation WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, creation_time, project, student) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_time(creation_time)
            participation.set_project(project)
            participation.set_student(student)
            result = participation

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, participation):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM participation ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            participation.set_id(maxid[0] + 1)

        command = "INSERT INTO participation (id, creation_time, project,student) VALUES (%s,%s,%s,%s)"
        data = (participation.get_id(), participation.get_creation_time(), participation.get_project(), participation.get_student())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation

    def update(self, participation):

        cursor = self._cnx.cursor()

        command = "UPDATE participation SET project=%s, student=%s WHERE id=%s".format(participation.get_id())
        data = (participation.get_project(), participation.get_student(),participation.get_creation_time(), participation.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, participation):

        cursor = self._cnx.cursor()

        command = "DELETE FROM participation WHERE id={}".format(participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_participation_of_student(self, student):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_time, project, student FROM participation WHERE student={}".format(student)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_time, project, student) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_time(creation_time)
            participation.set_project(project)
            participation.set_student(student)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result



    def find_participation_of_project(self, project):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_time, project,student FROM participation WHERE project={}".format(project)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_time, project, student) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_time(creation_time)
            participation.set_project(project)
            participation.set_student(student)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ParticipationMapper() as mapper:
        result = mapper.find_participation_by_project(1)
        for p in result:
            print(p)








