class User:
    def __init__(self, name, days, points=0):
        self.name = name
        self.days = days
        self.points = points

    @classmethod
    def from_dict(cls, dict):
        return User(dict['name'], dict['days'], dict['points'] if 'points' in dict.keys() else 0)

    def as_dict(self):
        return {"name": self.name, "days": self.days, "points": self.points}
