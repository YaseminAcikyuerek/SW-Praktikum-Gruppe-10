from server.bo.Person import Person
from server.db.Mapper import Mapper


class PersonMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, role_id from person")
        tuples = cursor.fetchall()

        for (id, name, role_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_role(role_id)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """Suchen einer Person mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Konto-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command= "SELECT id, name, role_id FROM person WHERE key={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, role_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_role(role_id)

        result = person

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0] + 1)

        command = "INSERT INTO person (id, name, role_id) VALUES (%s,%s,%s)"
        data = (person.get_id(), person.get_name(), person.get_role)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return person

    def update(self, person):

        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET name=%s,role_id=%s WHERE id=%s"
        data = (person.get_id(), person.get_name(), person.get_role())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param person das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_person_by_role(self, role):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param role E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit Participation-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält.
            """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, role_id FROM person WHERE role={}".format(role)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, role_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_role(role_id)
            result = person

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_person_by_name(self, name):

        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param name E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit Participation-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält.
            """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, role_id FROM person WHERE student.name={}".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, role_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_role(role_id)
            result = person

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with PersonMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)




