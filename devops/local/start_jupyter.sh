#!/bin/bash
set -euxo pipefail

jupyter notebook --allow-root --ip=0.0.0.0 --NotebookApp.token=Alohomora --log-level=ERROR
