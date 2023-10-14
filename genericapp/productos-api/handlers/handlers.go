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

func GetProducts(c *gin.Context) {
	rows, err := db.Query("SELECT name FROM productos")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var products []string
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		products = append(products, name)
	}

	c.JSON(200, products)
}

// ... [otros manejadores adaptados para SQLite]

func RegisterProduct(c *gin.Context) {
	var product struct {
		Name string `json:"name"`
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	stmt, err := db.Prepare("INSERT INTO productos(name) VALUES(?)")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(product.Name)
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

	row := db.QueryRow("SELECT name FROM productos WHERE name = ?", product.Name)

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
