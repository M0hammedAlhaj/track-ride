#!/bin/bash

# Author Information Extractor for track-ride repository
# This script analyzes the repository to extract all author/maintainer information

echo "=========================================="
echo "    AUTHOR/MAINTAINER INFORMATION ANALYSIS"
echo "=========================================="
echo

# Repository Information
echo "📁 REPOSITORY INFORMATION"
echo "------------------------------------------"
echo "Repository URL: $(git remote get-url origin)"
echo "Current Branch: $(git branch --show-current)"
echo "Repository Owner: $(basename $(dirname $(git remote get-url origin)))"
echo "Repository Name: $(basename $(git remote get-url origin) .git)"
echo

# Git Commit History Analysis
echo "📝 GIT COMMIT HISTORY"
echo "------------------------------------------"
echo "All unique authors:"
git log --pretty=format:"%an <%ae>" | sort | uniq
echo
echo
echo "Recent commit details:"
git log --pretty=format:"%an <%ae> - %ad - %s" --date=short -5
echo
echo

# Configuration File Analysis
echo "⚙️  CONFIGURATION FILES ANALYSIS"
echo "------------------------------------------"

# Check pom.xml for developer information
if [ -f "pom.xml" ]; then
    echo "pom.xml developer section:"
    if grep -q "<developers>" pom.xml; then
        sed -n '/<developers>/,/<\/developers>/p' pom.xml
    else
        echo "  No developer section found"
    fi
    echo
fi

# Check package.json for author information
if [ -f "frontend/package.json" ]; then
    echo "frontend/package.json author information:"
    if grep -q "author" frontend/package.json; then
        grep -A 5 -B 5 "author" frontend/package.json
    else
        echo "  No author field found"
    fi
    echo
fi

# Source Code Analysis
echo "💻 SOURCE CODE ANALYSIS"
echo "------------------------------------------"
echo "Files containing potential author information:"
find . -name "*.java" -o -name "*.ts" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.js" | \
    grep -v node_modules | \
    xargs grep -l -i "author\|maintainer\|@author\|Created by\|Written by" 2>/dev/null | \
    head -10

echo
echo "Author-related content in test files:"
grep -r -i "mohammed\|alhaj" . --exclude-dir=node_modules --exclude-dir=.git --include="*.java" 2>/dev/null | head -5
echo

# Documentation Analysis
echo "📚 DOCUMENTATION ANALYSIS"
echo "------------------------------------------"
echo "Documentation files found:"
find . -maxdepth 1 -name "*.md" -o -name "*.txt" -o -name "LICENSE*" -o -name "AUTHOR*" -o -name "MAINTAINER*" | sort
echo

# Contact Information Extraction
echo "📧 CONTACT INFORMATION EXTRACTION"
echo "------------------------------------------"
echo "Email addresses found in repository:"
grep -r -h -o -i '[a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}' . \
    --exclude-dir=node_modules --exclude-dir=.git \
    --include="*.java" --include="*.md" --include="*.json" --include="*.properties" 2>/dev/null | \
    sort | uniq | head -10
echo

# GitHub Metadata
echo "🐙 GITHUB METADATA"
echo "------------------------------------------"
if command -v curl >/dev/null 2>&1; then
    REPO_URL=$(git remote get-url origin)
    if [[ $REPO_URL == *"github.com"* ]]; then
        OWNER=$(basename $(dirname $REPO_URL))
        REPO=$(basename $REPO_URL .git)
        echo "GitHub Owner: $OWNER"
        echo "Repository: $REPO"
        echo "GitHub Profile URL: https://github.com/$OWNER"
    fi
fi
echo

# Summary
echo "📋 SUMMARY"
echo "------------------------------------------"
echo "Primary Author/Maintainer Information:"
echo "  Name: MohammedMamounHamedAlhaj"
echo "  GitHub: M0hammedAlhaj"
echo "  Email: mohammedalhaj@gmail.com (from test data)"
echo "  GitHub Email: 134335033+M0hammedAlhaj@users.noreply.github.com"
echo "  Repository: https://github.com/M0hammedAlhaj/track-ride"
echo
echo "Analysis completed on: $(date)"
echo "=========================================="