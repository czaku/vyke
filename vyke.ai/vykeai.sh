#!/bin/bash
#
# DJLAB - Native macOS Launcher
# 
# Just run: ./vykeai.sh
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${PURPLE}"
cat << 'EOF'
  ____       _ _          _     
 |  _ \     | | |        | |    
 | | | |    | | |    __ _| |__  
 | | | |_   | | |   / _` | '_ \ 
 | |/ / |__| | |__| (_| | |_) |
 |___/ \____/|_____\__,_|_.__/ 

EOF
echo -e "${NC}"

# Configuration
DJLAB_HOME="${DJLAB_HOME:-$HOME/Library/Application Support/DJLAB}"
DJLAB_MEDIA="${DJLAB_MEDIA:-$HOME/Music/DJLAB}"
DJLAB_PORT="${DJLAB_PORT:-8000}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "${CYAN}📍 DJLAB Directory: ${DJLAB_HOME}${NC}"
echo -e "${CYAN}🎵 Media Directory: ${DJLAB_MEDIA}${NC}"
echo ""

# Create directories if they don't exist
mkdir -p "$DJLAB_HOME"
mkdir -p "$DJLAB_MEDIA"
mkdir -p "$DJLAB_MEDIA/stems"
mkdir -p "$DJLAB_MEDIA/remixes"
mkdir -p "$DJLAB_MEDIA/samples"
mkdir -p "$DJLAB_MEDIA/uploads"

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.11+${NC}"
    echo "   brew install python@3.11"
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo -e "${GREEN}✓ Python $PYTHON_VERSION${NC}"

# Check for virtual environment
VENV_DIR="$SCRIPT_DIR/backend/.venv"
if [ ! -d "$VENV_DIR" ]; then
    echo -e "${YELLOW}📦 Creating virtual environment...${NC}"
    python3 -m venv "$VENV_DIR"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Install/update dependencies if needed
REQUIREMENTS_HASH=$(md5 -q "$SCRIPT_DIR/backend/requirements.txt" 2>/dev/null || md5sum "$SCRIPT_DIR/backend/requirements.txt" | cut -d' ' -f1)
INSTALLED_HASH_FILE="$VENV_DIR/.requirements_hash"

if [ ! -f "$INSTALLED_HASH_FILE" ] || [ "$(cat "$INSTALLED_HASH_FILE")" != "$REQUIREMENTS_HASH" ]; then
    echo -e "${YELLOW}📦 Installing dependencies (this may take a few minutes on first run)...${NC}"
    pip install --quiet --upgrade pip
    pip install --quiet -r "$SCRIPT_DIR/backend/requirements.txt"
    echo "$REQUIREMENTS_HASH" > "$INSTALLED_HASH_FILE"
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies up to date${NC}"
fi

# Check for optional dependencies
if command -v rubberband &> /dev/null; then
    echo -e "${GREEN}✓ Rubberband (high-quality time stretching)${NC}"
else
    echo -e "${YELLOW}⚠ Rubberband not found - using fallback time stretching${NC}"
    echo -e "  ${CYAN}Install with: brew install rubberband${NC}"
fi

# Export environment variables
export DJLAB_HOME
export DJLAB_MEDIA
export DJLAB_DB_PATH="$DJLAB_HOME/vykeai.db"
export DJLAB_MEDIA_PATH="$DJLAB_MEDIA"

echo ""
echo -e "${BLUE}🚀 Starting DJLAB...${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}👋 Shutting down DJLAB...${NC}"
    # Kill background processes
    jobs -p | xargs -r kill 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# Start backend
cd "$SCRIPT_DIR/backend"

# Check if port is already in use
if lsof -Pi :$DJLAB_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Port $DJLAB_PORT already in use. DJLAB may already be running.${NC}"
    echo -e "${CYAN}   Opening browser...${NC}"
    open "http://localhost:$DJLAB_PORT"
    exit 0
fi

# Start the server
echo -e "${GREEN}✓ Backend starting on http://localhost:$DJLAB_PORT${NC}"
echo -e "${CYAN}   API docs: http://localhost:$DJLAB_PORT/docs${NC}"
echo ""
echo -e "${PURPLE}Press Ctrl+C to stop${NC}"
echo ""

# Open browser after a short delay
(sleep 2 && open "http://localhost:$DJLAB_PORT") &

# Run uvicorn
python -m uvicorn app.main:app --host 0.0.0.0 --port $DJLAB_PORT --reload




