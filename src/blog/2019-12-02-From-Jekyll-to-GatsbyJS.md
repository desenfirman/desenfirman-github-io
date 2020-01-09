---
title: From Jekyll to GatsbyJS - Sebuah Review Singkat
date: '2019-12-02'
tags:
- review
- jekyll
- gatsbyjs
---

Jujur saja, dulu punya rencana untuk migrasi dari Jekyll ke *framework static web generator* yang lain. Alasannya? ya karena emang iseng ingin mencoba hal baru (hehe). Tapi gak jadi-jadi karena awalnya mengira bahwa [Github Pages](https://pages.github.com) hanya dapat menerima konten dari Jekyll. Waktu mencoba cari tahu info di salah satu komunitas *dev*, ternyata Github Pages dapat menerima konten selain dari Jekyll. Setelah tahu itu, kemudian nyari-nyari *static web generator* yang lain. Dan akhirnya, berjumpalah saya dengan GatsbyJS.

![Bukan, yang jelas bukan Gatsby yang ini wkwk](https://i.imgur.com/Gkt2mxW.png)

GatsbyJS ini adalah framework turunan ReactJS yang memang dikhususkan sebagai *static web generator*. Jika Jekyll menggunakan Ruby on Rails sebagai *base language* untuk *compiling* *page*-nya, maka Gatsby menggunakan bahasa Node JS untuk melakukan *compiling* halaman per halaman. Karena turunan langsung dari React, maka Gatsby juga secara tidak langsung memanfaatkan teknologi *progressive web apps*-nya milik ReactJS. Kapan lagi cuy? punya blog dengan rasa *progressive web apps*, wkwk.

![Nah, ini Gatsby yang bener](https://i.imgur.com/4MYxzK7.png)

```toc
```

## Motivasi

Penulis sebenarnya juga kurang begitu mencoba mengamati dan menganalisis secara detail bagaimana perbandingan performa antara GatsbyJS dan Jekyll. Secara fungsional, keduanya sama-sama *static-web generator* yang berarti web bisa berjalan dan mengambil data tanpa perlu melakukan koneksi ke *database server*. Pengguna cuma tinggal *deploy*, proses *compile* dilakukan dan kemudian data halaman untuk masing-masing *post* akan disimpan di layanan *web-hosting* berbasis *storage* (dalam hal ini GitHub Pages). Namun ada beberapa dugaan yang menjadi motivasi awal kenapa melakukan migrasi dari Jekyll ke GatsbyJS.

Salah satu alasannya yakni Gatsby JS ini turunan dari ReactJS dan harapannya dengan melakukan migrasi ke *framework* yang berbasis JavaScript ini, *blog* yang dihosting dapat secara dinamis berpindah dari halaman ke halaman dalam satu alamat (kebetulan setelah dicoba memang performa navigasinya jauh lebih mendingan dibanding menggunakan Jekyll, hehe).

Alasan yang selanjutnya yaitu *trend framework* JavaScript (terutama React JS) mengalami peningkatan pengguna dibanding *framework* yang lain. Otomatis, pengguna yang makin banyak == banyaknya juga *library* yang mendukung framework React JS ini == fleksibilitas untuk mengembangkan web ini juga semakin bertambah.

## First things first

> I have no idea what I should do

Ya begitulah yang ada di pikiran saya waktu akan melakukan migrasi ke GatsbyJS. Jujur, saya tidak punya latar belakang menggunakan *framework* berjenis JavaScript (terutama ReactJS). Namun, saya mencoba untuk memahami bagaimana struktur dan teknik pengembangan web menggunakan GatsbyJS ini dengan menggunakan *template* yang sudah ada. Pilihan jatuh di salah satu *starter* bernama [gatsby-starter-prologue](https://github.com/anubhavsrivastava/gatsby-starter-prologue).

![gatsby-starter-prologue: sangat beda sekali dengan web ini, wkwk](https://www.gatsbyjs.org/static/97a842a5083dff756f4b0f7d2bfaea2c/7b604/924eddb2c97546a79fec05bea8576b65.png)

Berkat template ini, saya banyak memahami istilah-istilah mulai dari *Component*, *State*, *React Lifecycle* serta bagaimana cara mengorganisir tiap *React Component* pada sebuah *project*. Dan mungkin inilah yang paling saya suka dari web yang berbasis ReactJS. Sebuah web dipecah menjadi beberapa komponen dan tiap komponen web memiliki direktori yang berbeda. Selain itu juga tiap komponen juga dapat langsung diaplikasikan sebuah *styling* (contohnya di component *Sidebar* ini misalnya). *Technically, better maintainability.*

![Yep, better maintainability](https://i.imgur.com/kBScXEn.png)

Berikut ini adalah struktur umum *static web* berbasis GatsbyJS yang diambil dari *official default starter* khusus untuk *blog* ([gatbsy-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)).

```text
your-gatsby-project-name/
|
└───content/
|   └───blog/         # tempat meletakkan konten blog
|   |   |   DD-MM-YY-Example-Post.md
|   |   |   ......-.md
|   |
|   └───assets/       # asset dari konten blog
|       |   ...-.jpg
|       |   ...
|
└───src/
|   └───components/   # tempat meletakkan pecahan komponen web
|   |   |   header.js
|   |   |   image.js
|   |   |    ...-.js
|   |
|   └───pages/        # tempat khusus untuk halaman web yang ada
|   |   |   404.js
|   |   |   about-us.js
|   |   |   ...-.js
|   |
|   └───templates/    # template untuk membuat halaman
|   |   |   blog-post.js
|   |   |   blog-list.js
|   |   |   ...-.js
|   |
|   └─────utils/      # tempat meletakkan utilitas simpel yang mungkin membantu
|       |   typography.js
|       |   ...-.js
|
|   gatsby-browser.js # interface yang digunakan untuk komunikasi antara gatsby ke client browser
|   gatsby-config.js  # konfigurasi utama gatsby dan tempat mendefinisikan package gatsby yang akan digunakan
|   gatsby-node.js    # kode yang dijalankan pertama kali setiap proses building dilakukan
|   gatsby-ssr.js     # kode untuk implementasi server-side rendering
|   package.json      # konfigurasi project berbasis npm
|   README.md
```

## Bagaimana halaman per post ditampilkan?

Jika pada Jekyll tiap halaman post akan di-*render* sesuai dengan *layout* yang sudah ditentukan dalam *format* YAML yang didefinisikan pada baris paling atas di *file* *Markdown*, maka pada GatsbyJS terdapat perbedaan dalam proses pembuatan halamannya.

Pada GatsbyJS, tiap halaman akan dibuat *in programmatic ways* — begitulah jika merujuk ke dokumentasi GatsbyJS — pada sebuah *file* yang bernama `gatsby-node.js`. Dalam pembuatan halaman, diperlukan sebuah *template* yang dibuat dalam bentuk JSX Component. Selain itu juga, data *Markdown* dari sebuah post hanya dapat diakses menggunakan GraphQL, bahasa *query* utama dari GatsbyJS. Namun GraphQL disini hanya bersifat sebagai representasi data yang ada di project Gatsby mulai dari *blog* *post*, gambar dan *file*-*file* lainnya. Bukan sebagai koneksi ke sebuah mesin database.

Secara garis besar, untuk membuat halaman untuk masing-masing *post* dapat dilakukan dengan langkah-langkah berikut:

1. Membuat halaman template khusus untuk **masing-masing post**.
2. Membuat halaman template khusus untuk **daftar postingan** (sebagai *index* postingan tentunya).
3. Melakukan **akses data** postingan ke local GraphQL (sebagai *slug* atau alamat masing-masing *post*).

    ```javascript
    // File: src/gatsby-node.js
    exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    return await graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                }
              }
            }
              group(field: frontmatter___tags) {
                fieldValue
                totalCount
              }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        throw result.errors
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges
      createPostPages(createPage, posts, 2)
    }
    ```

4. Lakukan perulangan untuk tiap data postingan dan buat masing-masing halaman dengan perulangan tersebut menggunakan fungsi `createPage` pada *file* `gatbsy-node.js`.

   ```javascript
    // File: src/gatsby-node.js
    function createPostPages(createPage, posts, postsPerPage) {
      // Create blog post pages
      // template untuk konten dari post
      const blogPost = path.resolve(`./src/templates/blog-post.js`)
      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
            blog_prefix_page
          },
        })
      })

      // Create blog post list pages
      const numPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? blog_prefix_page + `/` : blog_prefix_page + `/${i + 1}`,
          // template untuk membuat page list dari post
          component: path.resolve(`./src/templates/blog-list.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            prefix_page: blog_prefix_page,
          },
        });
      });
    }
   ```

## Basic GraphQL queries

Pada section sebelumnya, sempat disinggung mengenai akses data ke sebuah local GraphQL. Namun, akses data tersebut hanya sebatas proses memetakan alamat untuk masing-masing file *Markdown*. Selanjutnya, data alamat *Markdown* — atau disebut sebagai *slug* akan menjadi pemicu awal untuk mengakses data konten dari masing-masing *Markdown*, baik itu untuk file `blog-list.js` (daftar postingan) maupun `blog-post.js` (konten dari blog itu sendiri). Normalnya, sebuah *template* minimal terdapat *syntax* berikut untuk mengakses data pada GraphQL.

```javascript
// File: src/templates/blog-post.js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title,
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
      }
      fields {
        slug
        readingTime{
          text
        }
      }
    }
  }
`

```

Ketika *syntax* GraphQL diatas telah didefinisikan di sebuah *template* JSX. Kalian dapat mengakses hasil dari *query* tersebut dalam bentuk *object* JavaScript dengan perintah berikut:

```javascript
const post = this.props.data.markdownRemark

```

Data yang telah disimpan di variabel JS dapat langsung ditampilkan pada *method* `render()` atau juga dapat diolah terlebih dahulu sebelum ditampilkan.

Untuk lengkapnya kalian dapat mengunjungi tautan berikut:

> [Programmatically create pages from data | Gatsby JS](https://www.gatsbyjs.org/tutorial/part-seven/)

## Deployment

Secara *default*, GatsbyJS telah menyediakan beberapa *task script* yang sudah didefinisikan pada *file* `package.json` — tempat konfigurasi dari *project* berbasis NPM. Beberapa diantaranya yaitu:

1. develop: `gatsby develop`
2. build: `npm run clean && gatsby build`
3. serve: `gatsby serve`
4. clean: `rimraf .cache public`
5. format: `prettier --write '**/*.js'`
6. test: `echo \"Error: no test specified\" && exit 1`
7. deploy: `npm run clean && gatsby build  && gh-pages -d public -b master`

Proses *deployment* berjalan dengan melakukan *build* terlebih dahulu. Hasil proses *build* tersebut akan disimpan di direktori `public` sebelum dikirim ke repository Github Pages. Namun sebelum melakukan *deployment*, ada kalanya untuk menghapus bekas *deployment* dari Jekyll terlebih dahulu di *repository* GitHub Pages yang terkait.

![Yang terpenting adalah pastikan branch gh-pages dan bekas deployment Jekyll pada tab Environment telah dihapus sebelum deployment GatsbyJS dilakukan](https://i.imgur.com/e64uav1.png)

Setelah proses *cleaning* selesai, jalankan perintah *deploy* pada *file* `package.json` tersebut untuk memulai proses *deployment*. Direktori *public* hasil dari *build* tersebut akan di-*deploy* di GitHub Pages *repository* tepatnya pada *branch* `master`.
> PS: Ini sepertinya ketentuan dari GitHub. Jika ingin melakukan deployment untuk *project* berbasis selain Jekyll, maka *project* tersebut harus di-*deploy* di *branch* `master`, bukan di *branch* `gh-pages` layaknya *deployment* menggunakan Jekyll.

Proses *deployment* yang berhasil ditandai dengan status *active* pada halaman *environment repository* serta halaman *repository setting* di Github yang menyatakan bahwa Github Pages telah ter-*publish* di *branch* `master`.

![Yay, deployment is active](https://i.imgur.com/zAZkIDY.png)

![Yay, site is published](https://i.imgur.com/hTmDgTx.png)

Sekian dari *post* ini. Mungkin nanti saya juga akan *update* secara berkala *post* ini untuk beberapa tambahan lainnya.
