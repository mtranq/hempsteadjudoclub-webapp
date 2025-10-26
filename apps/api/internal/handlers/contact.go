package handlers

import (
	"encoding/json"
	"net/http"
)

type contactPayload struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func (s *Service) Contact(w http.ResponseWriter, r *http.Request) {
	var p contactPayload
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil || p.Name == "" || p.Email == "" || p.Message == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"invalid payload"}`))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte(`{"received":true}`))
}
