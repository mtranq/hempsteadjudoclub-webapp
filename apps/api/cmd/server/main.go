package main

import (
	"log"
	"os"

	"github.com/hempsteadjudoclub/api/internal/config"
	"github.com/hempsteadjudoclub/api/internal/http"
	l "github.com/hempsteadjudoclub/api/internal/log"
)

func main() {
	if err := config.LoadEnv(); err != nil {
		log.Printf("warning: .env not loaded: %v", err)
	}

	logger := l.New()
	r := http.NewRouter(logger)
	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080"
	}
	logger.Info().Msgf("api listening on :%s", port)
	if err := r.Start(":" + port); err != nil {
		logger.Fatal().Err(err).Msg("server failed")
	}
}
