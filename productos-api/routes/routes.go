package routes

import (
	"productos-api/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Configura CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true // Esto permite cualquier origen. Ajusta según tus necesidades.
	r.Use(cors.New(config))

	r.GET("/products", handlers.GetProducts)
	r.GET("/productsCertificadores", handlers.GetProductsCertification)
	r.POST("/register", handlers.RegisterProduct)
	r.POST("/certify", handlers.CertifyProduct)
	r.POST("/verify", handlers.VerifyProduct)

	return r
}
