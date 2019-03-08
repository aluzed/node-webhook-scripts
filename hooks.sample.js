module.exports = [
  {
    path: "/hello",
    command: "sh /var/www/wbhk/scripts/tests/hello.sh",
    cwd: "/var/www/wbhk/scripts/tests",
    method: "post"
  },
  {
    path: "/function",
    func: function(req, res) {
      return res.send('Foo');
    },
    method: "post"
  }
];