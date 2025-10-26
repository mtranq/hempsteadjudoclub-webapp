package models

type Class struct {
	Name  string `json:"name"`
	Level string `json:"level"`
	Days  string `json:"days"`
	Times string `json:"times"`
	Coach string `json:"coach"`
}
