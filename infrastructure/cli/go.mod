module cli

go 1.15

require (
	github.com/airyhq/airy/lib/go/httpclient v0.0.0
	github.com/imdario/mergo v0.3.11 // indirect
	github.com/kr/pretty v0.2.1
	github.com/mitchellh/go-homedir v1.1.0
	github.com/spf13/cast v1.3.1 // indirect
	github.com/spf13/cobra v1.1.1
	github.com/spf13/viper v1.7.1
	goji.io v2.0.2+incompatible
	gopkg.in/yaml.v2 v2.4.0
	k8s.io/api v0.20.1
	k8s.io/apimachinery v0.20.1
	k8s.io/client-go v0.20.1
)

replace github.com/airyhq/airy/lib/go/httpclient => ../../lib/go/httpclient
