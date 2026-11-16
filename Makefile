.PHONY: dev

PORT ?= 8000

# Serve the static site locally at http://localhost:$(PORT)
dev:
	@echo "Serving at http://localhost:$(PORT) (Ctrl+C to stop)"
	python3 -m http.server $(PORT)
