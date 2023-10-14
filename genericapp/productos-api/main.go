// main.go

package main

import (
	"productos-api/routes"
)

func main() {
	r := routes.SetupRouter()
	r.Run(":8080") // Escucha en el puerto 8080
}
