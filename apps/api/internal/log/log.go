package log

import (
	"os"

	"github.com/rs/zerolog"
)

func New() zerolog.Logger {
	z := zerolog.New(os.Stdout).With().Timestamp().Logger()
	return z
}
