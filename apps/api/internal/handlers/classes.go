package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/hempsteadjudoclub/api/internal/models"
)

func (s *Service) Classes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	classes := []models.Class{
		{Name: "Kids Judo", Level: "Beginner", Days: "Mon & Wed", Times: "17:00–18:00", Coach: "Coach A"},
		{Name: "Teens Judo", Level: "All levels", Days: "Tue & Thu", Times: "18:00–19:30", Coach: "Coach B"},
		{Name: "Adult Judo", Level: "Mixed", Days: "Tue & Thu", Times: "19:30–21:00", Coach: "Coach C"},
	}
	json.NewEncoder(w).Encode(classes)
}
