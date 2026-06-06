# DSC Lab 7

## A

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string sche;
    cin >> sche;

    int n;
    cin >> n;

    vector<pair<set<char>, set<char>>> fds(n);
    for (int i = 0; i < n; i++) {
        string line;
        cin >> line;
        int pos = line.find("->");
        string left_str = line.substr(0, pos);
        string right_str = line.substr(pos + 2);
        set<char> left(left_str.begin(), left_str.end());
        set<char> right(right_str.begin(), right_str.end());
        fds[i] = {left, right};
    }

    int m;
    cin >> m;

    while (m--) {
        string query;
        cin >> query;

        set<char> result(query.begin(), query.end());

        bool chan = true;
        while (chan) {
            chan = false;
            for (auto &[left, right] : fds) {
                if (includes(result.begin(), result.end(), left.begin(), left.end())) {
                    size_t last = result.size();
                    result.insert(right.begin(), right.end());
                    if (result.size() > last)
                    chan = true;
                }
            }
        }

        string ans(result.begin(), result.end());
        cout << ans << "\n";
    }

    return 0;
}
```

## B

```cpp
#include <bits/stdc++.h>

using namespace std;

set<char> clo(const set<char> &attrs,
const vector<pair<set<char>, set<char>>> &fds) {
    set<char> result = attrs;
    bool cha = true;
    while (cha) {
        cha = false;
        for (auto &[l, r] : fds) {
            if (includes(result.begin(), result.end(), l.begin(), l.end())) {
                size_t before = result.size();
                result.insert(r.begin(), r.end());
                if (result.size() > before)
                cha = true;
            }
        }
    }
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int T;
    cin >> T;

    while (T--) {
        string str;
        cin >> str;
        set<char> R(str.begin(), str.end());

        int m;
        cin >> m;

        vector<pair<set<char>, set<char>>> fds(m);
        for (int i = 0; i < m; i++) {
            string line;
            cin >> line;
            int pos = line.find("->");
            string ls = line.substr(0, pos);
            string rs = line.substr(pos + 2);
            fds[i] = {set<char>(ls.begin(), ls.end()),
                set<char>(rs.begin(), rs.end())};
        }

        bool isBCNF = true;
        for (auto &[left, right] : fds) {
            bool trivial =
            includes(left.begin(), left.end(), right.begin(), right.end());
            if (trivial)
            continue;

            set<char> cl = clo(left, fds);
            if (cl != R) {
                isBCNF = false;
                break;
            }
        }

        cout << (isBCNF ? "BCNF" : "None") << "\n";
    }

    return 0;
}
```

## C

```cpp
#include <bits/stdc++.h>
using namespace std;

set<char> clo(const set<char> &attrs,
const vector<pair<set<char>, set<char>>> &fds) {
    set<char> result = attrs;
    bool cha = true;

    while (cha) {
        cha = false;
        for (auto &[left, right] : fds) {
            if (includes(result.begin(), result.end(), left.begin(), left.end())) {
                size_t before = result.size();
                result.insert(right.begin(), right.end());
                if (result.size() > before)
                cha = true;
            }
        }
    }

    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<string> re(n);
    for (int i = 0; i < n; i++)
    cin >> re[i];

    int m;
    cin >> m;

    vector<pair<set<char>, set<char>>> fds(m);
    for (int i = 0; i < m; i++) {
        string line;
        cin >> line;
        int pos = line.find("->");
        string ls = line.substr(0, pos);
        string rs = line.substr(pos + 2);
        fds[i] = {set<char>(ls.begin(), ls.end()), set<char>(rs.begin(), rs.end())};
    }

    for (int i = 0; i < n; i++) {
        string &rel = re[i];
        set<char> Ri(rel.begin(), rel.end());
        int sz = rel.size();

        bool is = true;

        for (int mask = 1; mask < (1 << sz); mask++) {
            set<char> alpha;
            for (int j = 0; j < sz; j++)
            if (mask >> j & 1)
            alpha.insert(rel[j]);

            set<char> cl = clo(alpha, fds);

            set<char> clr;
            set_intersection(cl.begin(), cl.end(), Ri.begin(), Ri.end(),
            inserter(clr, clr.begin()));

            set<char> ria;
            set_difference(Ri.begin(), Ri.end(), alpha.begin(), alpha.end(),
            inserter(ria, ria.begin()));

            set<char> extra;
            set_intersection(clr.begin(), clr.end(), ria.begin(), ria.end(),
            inserter(extra, extra.begin()));

            if (extra.empty())
            continue;
            if (clr == Ri)
            continue;

            is = false;
            break;
        }

        cout << (is ? "BCNF" : "None") << "\n";
    }

    return 0;
}
```

## D

```cpp
#include <bits/stdc++.h>
using namespace std;

set<char> clo(const set<char> &attrs,
const vector<pair<set<char>, set<char>>> &fds) {
    set<char> result = attrs;
    bool flag = true;

    while (flag) {
        flag = false;

        for (auto &[left, right] : fds) {
            if (includes(result.begin(), result.end(), left.begin(), left.end())) {
                size_t before = result.size();
                result.insert(right.begin(), right.end());

                if (result.size() > before)
                flag = true;
            }
        }
    }

    return result;
}

bool ispre(const set<char> &alpha, const set<char> &beta,
const vector<set<char>> &RS,
const vector<pair<set<char>, set<char>>> &fds) {
    set<char> res = alpha;
    bool flag = true;

    while (flag) {
        flag = false;

        for (auto &Ri : RS) {
            set<char> inter;
            set_intersection(res.begin(), res.end(), Ri.begin(), Ri.end(),
            inserter(inter, inter.begin()));

            set<char> cl = clo(inter, fds);
            set<char> t;
            set_intersection(cl.begin(), cl.end(), Ri.begin(), Ri.end(),
            inserter(t, t.begin()));

            size_t before = res.size();
            res.insert(t.begin(), t.end());

            if (res.size() > before)
            flag = true;
        }
    }
    return includes(res.begin(), res.end(), beta.begin(), beta.end());
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int m;
    cin >> m;

    vector<pair<set<char>, set<char>>> fds(m);
    for (int i = 0; i < m; i++) {
        string line;
        cin >> line;
        int pos = line.find("->");
        string ls = line.substr(0, pos);
        string rs = line.substr(pos + 2);
        fds[i] = {set<char>(ls.begin(), ls.end()), set<char>(rs.begin(), rs.end())};
    }

    int n;
    cin >> n;

    vector<set<char>> RS(n);
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        RS[i] = set<char>(s.begin(), s.end());
    }

    for (auto &[left, right] : fds) {
        bool res = ispre(left, right, RS, fds);
        cout << (res ? "True" : "False") << "\n";
    }

    return 0;
}
```
