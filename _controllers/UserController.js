class UserController {
    constructor(formIdCreate, formIdUpdate, tableId) {
        this._formEl = document.getElementById(formIdCreate);
        this._formUpdateEl = document.getElementById(formIdUpdate);
        this._tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
    }

    switchBoxes(create, update) {
        document.querySelector("#box-user-create").style.display = create;
        document.querySelector("#box-user-update").style.display = update;
    }

    onEdit() {
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this.switchBoxes("block", "none");
        });

        this.formUpdateEl.addEventListener("submit", e => {
            e.preventDefault();
            
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            btn.disabled = "disabled";
            
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let oldUser = JSON.parse(tr.dataset.user);
            let result = Object.assign({}, oldUser, values);
            
            this.getPhoto(this.formUpdateEl).then(
                (content) => {
                    if (!values._photo) {
                        result._photo = oldUser._photo;
                    } else {
                        result._photo = content;
                    }
                    
                    tr.dataset.user = JSON.stringify(result);
                    tr.innerHTML = `
                        <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${result._name}</td>
                        <td>${result._email}</td>
                        <td>${(result._admin) ? "Sim" : "Não"}</td>
                        <td>${Utils.dateFormat(result._register)}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                        </td>
                    `;
                    
                    this.addEventsTr(tr);
                    this.updateCount();
                    this.formUpdateEl.reset();
                    btn.disabled = false;
                    this.switchBoxes("block", "none");
                },
                (e) => {
                    console.error(e)
                }
            );
        });
    }

    onSubmit() {
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this.getValues(this.formEl);

            if (!values) return false;
            
            this.getPhoto(this.formEl).then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;
                },
                (e) => {
                    console.error(e);
                }
            );
        });
    }

    getPhoto(formEl) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let elements = [...formEl.elements].filter(item => {
                if (item.name === "photo") {
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            };

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve("dist/img/boxed-bg.jpg");
            }
        });
    }

    getValues(formEl) {
        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(field) {
            if (["name", "email", "password"].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add("has-error");
                isValid = false;
            }

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }
        });

        if (!isValid) {
            return false;
        }

        return new User(user);
    }

    addEventsTr(tr) {
        tr.querySelector(".btn-edit").addEventListener("click", e => {
            let json = JSON.parse(tr.dataset.user);
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for (let name in json) {
                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
                if (field) {
                    switch(field.type) {
                        case "file":
                            continue;
                            break;
                        case "radio":
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;
                        case "checkbox":
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                    }
                }
            }
            this.formUpdateEl.querySelector(".photo").src = json._photo;
            this.switchBoxes("none", "block");
        });
    }

    addLine(dataUser) {
        let tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.addEventsTr(tr);

        this.tableEl.appendChild(tr);
        this.updateCount();
    }

    updateCount() {
        let numberUsers = 0;
        let numberAdmin = 0;
        
        [...this.tableEl.children].forEach(tr => {
            numberUsers++;
            let user = JSON.parse(tr.dataset.user);
            if (user._admin) {
                numberAdmin++;
            }
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }

    get formEl() {
        return this._formEl;
    }

    set formEl(formEl) {
        this._formEl = formEl;
    }

    get formUpdateEl() {
        return this._formUpdateEl;
    }

    set formUpdateEl(formUpdateEl) {
        this._formUpdateEl = formUpdateEl;
    }

    get tableEl() {
        return this._tableEl;
    }

    set tableEl(tableEl) {
        this._tableEl = tableEl;
    }
}