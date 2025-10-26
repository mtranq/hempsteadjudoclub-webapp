package handlers

import (
	"net/http"
)

type Service struct{ Logger interface{ Info() loggerEvent; Fatal() loggerEvent } }

type loggerEvent interface{ Msg(string); Msgf(string, ...interface{}); Err(error) loggerEvent }

func (s *Service) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok"}`))
}
