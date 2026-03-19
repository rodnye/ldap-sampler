import ldap from '@mbakereth/ldapjs';

const PORT = parseInt(process.env.PORT) || 1345;
const BASE_DN = 'dc=example,dc=com';

let users = [];

try {
  users = JSON.parse(process.env.LDAP_DATA || '[]');
} catch {
  console.error('Invalid LDAP_DATA JSON');
  process.exit(1);
}

const server = ldap.createServer();

server.bind(BASE_DN, (req, res, next) => {
  const { dn, credentials } = req;

  const user = users.find((u: any) => u.dn === dn.toString());

  if (!user || user.password !== credentials) {
    return next(new ldap.InvalidCredentialsError());
  }

  res.end();
  return next();
});

server.search(BASE_DN, (req, res, next) => {
  users.forEach((user: any) => {
    const entry = {
      dn: user.dn,
      attributes: {
        cn: user.cn,
        sn: user.sn,
        uid: user.uid,
        objectClass: ['inetOrgPerson']
      }
    };

    if (req.filter.matches(entry.attributes)) {
      res.send(entry);
    }
  });

  res.end();
  return next();
});

server.listen(PORT, () => {
  console.log(`LDAP running at ldap://0.0.0.0:${PORT}`);
});