# ldap-sampler

Minimal LDAP server in Node.js + TypeScript.

## run

```bash
pnpm install
pnpm start
```

## docker

```bash
docker build -t ldap-sampler .
docker run -p 1389:1389 -e LDAP_DATA='[]' ldap-sampler
```

## env

```bash
LDAP_DATA='[
  {
    "dn": "uid=admin,dc=example,dc=com",
    "cn": "admin",
    "sn": "admin",
    "uid": "admin",
    "password": "1234"
  }
]'
```

## test

```bash
ldapsearch -x -H ldap://localhost:1389 -b "dc=example,dc=com"
```

## notes

- in-memory data
- supports bind and search
- not production ready
