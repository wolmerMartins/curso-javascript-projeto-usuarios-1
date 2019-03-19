class User {
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch(name) {
                case "_register":
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }
        }
    }

    static getUsersStorage() {
        let users = [];
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }
        return users;
    }

    getNewID() {
        let usersID = parseInt(localStorage.getItem("usersId"));
        if (!usersID > 0) usersID = 0;
        usersID++;
        localStorage.setItem("usersID", usersID);
        return usersID;
    }

    save() {
        let users = User.getUsersStorage();

        if (this.id > 0) {
            users.map(u => {
                if (u._id == this.id) {
                    Object.assign(u, this);
                }
                return u;
            });
        } else {
            this.id = this.getNewID();
            users.push(this);
        }
        
        localStorage.setItem("users", JSON.stringify(users));
    }

    remove() {
        let users = User.getUsersStorage();
        users.forEach((userData, index) => {
            if (this._id == userData._id) {
                users.splice(index, 1);
            }
        });
        localStorage.setItem("users", JSON.stringify(users));
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get birth() {
        return this._birth;
    }

    set birth(birth) {
        this._birth = birth;
    }

    get country() {
        return this._country;
    }

    set country(country) {
        this._country = country;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get photo() {
        return this._photo;
    }

    set photo(photo) {
        this._photo = photo;
    }

    get admin() {
        return this._admin;
    }

    set admin(admin) {
        this._admin = admin;
    }

    get register() {
        return this._register;
    }

    set register(register) {
        this._register = register;
    }
}