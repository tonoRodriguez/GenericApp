package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func SetupDatabase() {
	db, err := sql.Open("sqlite3", "./productos.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTableSQL := `
	CREATE TABLE IF NOT EXISTS Huerto (
		name TEXT PRIMARY KEY,
		number INT NOT NULL
	);
	`
	statement, err := db.Prepare(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}
	_, err = statement.Exec()
	defer statement.Close()
	if err != nil {
		log.Fatal(err)
	}

	statement, err = db.Prepare("INSERT INTO Huerto (name, number) VALUES (?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer statement.Close()

	_, err = statement.Exec("Mandarina", 500)
	if err != nil {
		log.Fatal(err)
	}
	//_________________-agregar compañia___________--
	createTableSQL = `
	CREATE TABLE IF NOT EXISTS Certificados(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		company_c TEXT,
		company_bj TEXT,
		name TEXT NOT NULL,
		activo INTEGER,
		bano_j INTEGER,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (name) REFERENCES Huerto(name)
	);	
	`
	statement, err = db.Prepare(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}
	_, err = statement.Exec()
	defer statement.Close()
	if err != nil {
		log.Fatal(err)
	}

	statement, err = db.Prepare("INSERT INTO Certificados (company_c,company_bj,name,activo,bano_j) VALUES (?,?,?,?,?)")
	if err != nil {
		log.Fatal(err)
	}
	defer statement.Close()

	_, err = statement.Exec("Certificaciones CA", "Baños Jabonos", "Mandarina", "1", "1")
	if err != nil {
		log.Fatal(err)
	}

	//______________________Agregar sag______________________________

	createTableSQL = `
	CREATE TABLE IF NOT EXISTS SAG(
		companyname TEXT PRIMARY KEY,
		activo INTEGER,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);	
	`
	statement, err = db.Prepare(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}
	_, err = statement.Exec()
	defer statement.Close()
	if err != nil {
		log.Fatal(err)
	}

	statement, err = db.Prepare("INSERT INTO SAG (companyname,activo) VALUES (?,?)")
	if err != nil {
		log.Fatal(err)
	}
	defer statement.Close()

	_, err = statement.Exec("Certificaciones CA", "1")
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	SetupDatabase()
}
