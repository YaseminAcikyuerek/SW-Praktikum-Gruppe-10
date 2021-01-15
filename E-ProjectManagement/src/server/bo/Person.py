from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Person(nbo):

    def __init__(self):
        super().__init__()
        self._role = None




    def set_role(self, role):
        self._role = role

    def get_role(self):
        return self._role











    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_name(dictionary["name"])
        obj.set_role(dictionary["role"])


        return obj
