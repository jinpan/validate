FROM python:3.11

COPY devops/requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --requirement /tmp/requirements.txt

WORKDIR /validate
CMD /validate/devops/local/start_jupyter.sh
