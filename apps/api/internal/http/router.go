package http

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/rs/zerolog"

	handlers "github.com/hempsteadjudoclub/api/internal/handlers"
)

type Server struct {
	mux    *chi.Mux
	logger zerolog.Logger
}

func NewRouter(logger zerolog.Logger) *Server {
	mux := chi.NewRouter()
	corsMw := cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	mux.Use(corsMw)

	hs := &handlers.Service{Logger: logger}
	mux.Get("/healthz", hs.Health)
	mux.Get("/api/v1/classes", hs.Classes)
	mux.Post("/api/v1/contact", hs.Contact)

	return &Server{mux: mux, logger: logger}
}

func (s *Server) Start(addr string) error {
	return http.ListenAndServe(addr, s.mux)
}
