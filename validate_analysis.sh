#!/bin/bash

# Validation script for author information analysis
# This script verifies that the analysis findings are correct

echo "Validating Author Information Analysis..."
echo "========================================"

# Validate JSON format
if command -v python3 >/dev/null 2>&1; then
    echo "✓ Validating JSON format..."
    python3 -m json.tool author_analysis.json > /dev/null
    if [ $? -eq 0 ]; then
        echo "  ✓ JSON is valid"
    else
        echo "  ✗ JSON is invalid"
        exit 1
    fi
else
    echo "  ! Python3 not available, skipping JSON validation"
fi

# Validate that key files exist
echo "✓ Checking analysis files..."
if [ -f "AUTHOR_ANALYSIS.md" ]; then
    echo "  ✓ AUTHOR_ANALYSIS.md exists"
else
    echo "  ✗ AUTHOR_ANALYSIS.md missing"
    exit 1
fi

if [ -f "author_analysis.json" ]; then
    echo "  ✓ author_analysis.json exists"
else
    echo "  ✗ author_analysis.json missing"
    exit 1
fi

if [ -f "extract_author_info.sh" ] && [ -x "extract_author_info.sh" ]; then
    echo "  ✓ extract_author_info.sh exists and is executable"
else
    echo "  ✗ extract_author_info.sh missing or not executable"
    exit 1
fi

# Validate git author information
echo "✓ Validating git author information..."
GIT_AUTHOR=$(git log --pretty=format:"%an" | grep -v "copilot" | head -1)
if [ "$GIT_AUTHOR" = "MohammedMamounHamedAlhaj" ]; then
    echo "  ✓ Git author matches analysis"
else
    echo "  ✗ Git author mismatch: found '$GIT_AUTHOR'"
    exit 1
fi

# Validate email extraction
echo "✓ Validating email extraction..."
EMAIL_FOUND=$(grep -r "mohammedalhaj@gmail.com" src/test/ | wc -l)
if [ "$EMAIL_FOUND" -gt "0" ]; then
    echo "  ✓ Personal email found in test files"
else
    echo "  ✗ Personal email not found in test files"
    exit 1
fi

# Validate repository information
echo "✓ Validating repository information..."
REPO_URL=$(git remote get-url origin)
if [[ "$REPO_URL" == *"M0hammedAlhaj/track-ride"* ]]; then
    echo "  ✓ Repository URL matches analysis"
else
    echo "  ✗ Repository URL mismatch: $REPO_URL"
    exit 1
fi

echo
echo "========================================="
echo "✓ All validations passed!"
echo "✓ Author information analysis is complete and verified"
echo "========================================="