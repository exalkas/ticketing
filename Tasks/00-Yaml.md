 # YAML structure

  ### YAML stands for Yet Another Markup Language

- apiVersion: at which set of objects K8 should look at
- kind: the type of object to be created. e.g. pods
- metadata: config options
- name: name of the object
- spec: attributes for the apply to the object that is being created
- containers: this is an array. items below this start with a "-"
- image: where is the iage located
- TO SEPARATE OBJECTS IN an YAML file use `---`