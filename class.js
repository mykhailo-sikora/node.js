const fs = require("fs").promises;
const path = require("path");

const goToData = path.join(process.cwd(), "base", "data.json");
console.log(`Way: ${goToData}`);

class User {
  constructor(id, name, surname, age) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
}
class UserStorage {
  constructor() {
    this.storage = [];
  }
  async addUser(user) {
    this.storage.push(user);
    await this.writeUser(user);
  }
  findUserByName(name) {
    return this.storage.find((user) => user.name === name);
  }
  getAllUsers() {
    return this.storage;
  }
  deleteUserByName(name) {
    return this.storage.find((user, index) => {
      if (user.name === name) {
        this.storage.splice(index, 1);
      }
    });
  }
  async writeUser(user) {
    let dataLines = await (await fs.readFile(goToData)).toString().split("\n");
    let dataLinesLenghts = dataLines.length - 2;

    if (dataLines.length < 3) {
      throw new Error("shit");
    }
    let isDataEmpty = dataLines.length === 3;

    if (isDataEmpty) {
      dataLines.splice(dataLinesLenghts, 0, JSON.stringify(user));
    } else {
      dataLines.splice(dataLinesLenghts, 0, "," + JSON.stringify(user));
    }

    await fs.writeFile(goToData, dataLines.join("\n"));
  }
  async getUsersFromFile() {
    const allUsers = await fs.readFile(goToData);
    return JSON.parse(allUsers);
  }
}

const storage = new UserStorage();
let Vanya = new User(1, "vanya", "petrov", 22);

storage.addUser(Vanya);

async function alluser() {
  const users = await storage.getUsersFromFile();
  console.log(`all users: ` + JSON.stringify(users));
}

alluser();
