# Variables
CURRENT_BRANCH := $(shell git branch --show-current)
TARGET_BRANCH := main
SOURCE_BRANCH := develop

# Merge command with custom commit message
merge:
	@if [ -z "$(c)" ]; then \
		echo "Usage: make merge c=\"<your commit message>\""; \
		exit 1; \
	fi
	@echo "=== Step 1: git add . ==="
	git add .
	@echo "=== Step 2: git commit -m \"$(c)\" ==="
	git commit -m "$(c)" || true
	@if [ "$(CURRENT_BRANCH)" = "develop" ]; then \
		echo "=== Current branch is develop, following standard workflow ==="; \
		echo "=== Step 3: git push ==="; \
		git push; \
		echo "=== Step 4: git checkout $(TARGET_BRANCH) ==="; \
		git checkout $(TARGET_BRANCH); \
		echo "=== Step 5: git merge $(SOURCE_BRANCH) ==="; \
		git merge $(SOURCE_BRANCH); \
		echo "=== Step 6: git push ==="; \
		git push; \
		echo "=== Step 7: git checkout $(SOURCE_BRANCH) ==="; \
		git checkout $(SOURCE_BRANCH); \
	else \
		echo "=== Current branch is not develop, following alternative workflow ==="; \
		echo "=== Step 3-1: git add . ==="; \
		git add .; \
		echo "=== Step 3-2: git commit -m \"$(c)\" ==="; \
		git commit -m "$(c)" || true; \
		echo "=== Step 3-3: git checkout $(SOURCE_BRANCH) ==="; \
		git checkout $(SOURCE_BRANCH); \
		echo "=== Step 3-4: git merge $(CURRENT_BRANCH) ==="; \
		git merge $(CURRENT_BRANCH); \
		echo "=== Step 4: git push ==="; \
		git push; \
		echo "=== Step 5: git checkout $(TARGET_BRANCH) ==="; \
		git checkout $(TARGET_BRANCH); \
		echo "=== Step 6: git merge $(SOURCE_BRANCH) ==="; \
		git merge $(SOURCE_BRANCH); \
		echo "=== Step 7: git push ==="; \
		git push; \
		echo "=== Step 8: git checkout $(CURRENT_BRANCH) ==="; \
		git checkout $(CURRENT_BRANCH); \
	fi
	@echo "=== Operation completed successfully ==="

# Alternative version with safety checks
merge-safe:
	@if [ -z "$(c)" ]; then \
		echo "Usage: make merge-safe c=\"<your commit message>\""; \
		exit 1; \
	fi
	@echo "=== Checking repository status ==="
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "=== Step 1: git add . ==="; \
		git add .; \
		echo "=== Step 2: git commit -m \"$(c)\" ==="; \
		git commit -m "$(c)"; \
	else \
		echo "No changes to commit"; \
	fi
	@if [ "$(CURRENT_BRANCH)" = "upload-images" ]; then \
		echo "=== Current branch is upload-images, following standard workflow ==="; \
		echo "=== Step 3: git push ==="; \
		git push; \
		echo "=== Step 4: git checkout $(TARGET_BRANCH) ==="; \
		git checkout $(TARGET_BRANCH); \
		echo "=== Step 5: git merge $(SOURCE_BRANCH) ==="; \
		git merge $(SOURCE_BRANCH); \
		echo "=== Step 6: git push ==="; \
		git push; \
		echo "=== Step 7: git checkout $(SOURCE_BRANCH) ==="; \
		git checkout $(SOURCE_BRANCH); \
	else \
		echo "=== Current branch is not upload-images, following alternative workflow ==="; \
		echo "=== Step 3-1: git checkout $(SOURCE_BRANCH) ==="; \
		git checkout $(SOURCE_BRANCH); \
		echo "=== Step 3-2: git merge $(CURRENT_BRANCH) ==="; \
		git merge $(CURRENT_BRANCH); \
		echo "=== Step 4: git push ==="; \
		git push; \
		echo "=== Step 5: git checkout $(TARGET_BRANCH) ==="; \
		git checkout $(TARGET_BRANCH); \
		echo "=== Step 6: git merge $(SOURCE_BRANCH) ==="; \
		git merge $(SOURCE_BRANCH); \
		echo "=== Step 7: git push ==="; \
		git push; \
		echo "=== Step 8: git checkout $(CURRENT_BRANCH) ==="; \
		git checkout $(CURRENT_BRANCH); \
	fi
	@echo "=== Operation completed successfully ==="

# Help
help:
	@echo "Available commands:"
	@echo "  make merge c=\"commit message\"     - Execute complete merge workflow"
	@echo "  make merge-safe c=\"message\"       - Version with additional checks"
	@echo "  make help                           - Show this help"

.PHONY: merge merge-safe help