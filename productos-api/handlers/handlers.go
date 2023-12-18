package handlers

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./dbsetup/productos.db")
	if err != nil {
		log.Fatal(err)
	}
}

// -------------------------------- Funciones relacionadas con el Huerto --------------------------------------------------------------
func GetProducts(c *gin.Context) {
	query := `
	SELECT Huerto.name, Huerto.number, Certificados.activo, Certificados.created_at 
	FROM Huerto
	LEFT JOIN Certificados ON Huerto.name = Certificados.name
	`
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	type Product struct {
		Name      string
		Number    int
		Activo    sql.NullInt64
		CreatedAt sql.NullString
	}

	var products []Product

	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.Name, &p.Number, &p.Activo, &p.CreatedAt); err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		products = append(products, p)
	}

	c.JSON(200, products)
}

func RegisterProduct(c *gin.Context) {
	var product struct {
		Name   string `json:"name"`
		Number int    `json:"number"`
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	stmt, err := db.Prepare("INSERT INTO Huerto(name, number) VALUES(?, ?)")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(product.Name, product.Number)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Producto registrado con éxito!"})
}

func VerifyProduct(c *gin.Context) {
	var product struct {
		Name string `json:"name"`
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	row := db.QueryRow("SELECT name FROM Huerto WHERE name = ?", product.Name)

	var name string
	err := row.Scan(&name)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(404, gin.H{"message": "Producto no encontrado."})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(200, gin.H{"message": "Producto verificado!"})
}

//-----------------------------------------------------Funciones relacionadas con los certificadores--------------------------------------------

func GetProductsCertification(c *gin.Context) {
	query := `
	SELECT Huerto.name, Certificados.activo, Certificados.company, Certificados.created_at 
	FROM Huerto
	LEFT JOIN Certificados ON Huerto.name = Certificados.name
	`
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	type Product struct {
		Name      string
		Activo    sql.NullInt64
		Company   sql.NullString
		CreatedAt sql.NullString
	}

	var products []Product

	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.Name, &p.Activo, &p.Company, &p.CreatedAt); err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		products = append(products, p)
	}

	c.JSON(200, products)
}

func CertifyProduct(c *gin.Context) {

	var product struct {
		Name    string `json:"name"`
		Company string `json:"company"`
		Activo  int    `json:"activo"`
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	stmt, err := db.Prepare("INSERT INTO Certificados (name,company,activo) VALUES (?,?,?)")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(product.Name, product.Company, product.Activo)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Producto certificado con éxito!"})
}
func Sagaproval(c *gin.Context) {
	var product struct {
		Company string `json:"company"`
		Activo  int    `json:"activo"`
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

}

func GetCompanies(c *gin.Context) {
	query := `
	SELECT SAG.companyname, SAG.activo, SAG.created_at 
	FROM SAG
	`
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	type Product struct {
		CompanyName string
		Activo      sql.NullInt64
		CreatedAt   sql.NullString
	}
	var products []Product

	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.CompanyName, &p.Activo, &p.CreatedAt); err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		products = append(products, p)
	}

	c.JSON(200, products)
}
