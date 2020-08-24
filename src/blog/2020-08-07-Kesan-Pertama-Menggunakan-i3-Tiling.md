---
title: Kesan Pertama Menggunakan i3 - Tiling Window Manager
date: '2020-08-07'
tags:
- i3 
- linux
- review
- tips and trick
- window manager
- dotfiles
- productivity
---

Awal saya menggunakan *tiling window manager* dimulai saat laptop saya yang utama, Acer E5-475G rusak. Ya, syukurlah ketika laptop utama saya rusak, masih ada laptop cadangan yang kira-kira sudah berumur 8 tahun lebih. Berhubung karena laptop cadangan ini spesifikasinya sangat jadul (Intel Core i3 SandyBridge, 4GB RAM & HDD 500GB) dan sangat tidak nyaman digunakan dalam proses *development*, timbul keingingan untuk melakukan modifikasi bagaimana caranya memangkas *resources* yang ada di *background* namun tidak benar-benar dibutuhkan.

```toc
```

Laptop cadangan saya sudah ter-*install* Ubuntu 20.04 (Focal Fossa). Secara *default* *Desktop Environment-*nya (DE) adalah GNOME. *FYI*, saya sangat suka dengan GNOME dari dulu karena tampilannya cukup bagus dan opsi kustomisasinya (mulai dari tema, *icon*, *font* dan *cursor*) sangat beragam. Namun, karena GNOME ini DE yang cukup berat, terpaksa saya memangkas beberapa elemen-elemen GNOME yang sebenarnya tidak cukup penting dalam proses *development*. Percobaan pertama, yaitu memangkas semua kustomisasi yang ada di GNOME dan kembali ke setelah *default*. Hasilnya, ternyata tidak memberikan perubahan. Percobaan kedua, yaitu memangkas animasi serta memangkas background proses GNOME yang tidak dibutuhkan. Hasilnya, ternyata tetap sama juga ☹️.

Kemudian, saya teringat pada salah satu subreddit yang bernama [r/unixporn](https://www.reddit.com/r/unixporn/), dimana orang-orang disana suka memposting tampilan dari *desktop* Linux milik mereka yang dikustomisasi sedemikian rupa hingga menjadi desktop sangat menarik untuk dilihat. Mayoritas orang disana menggunakan w*indow manager* yang jenisnya *tiling window manager* (eg: i3, awesomeWM, bspwm, dll). Kata beberapa orang disana karena selain sangat ringan, *tiling window manager* ini juga memudahkan dalam berganti-ganti window disaat proses *development* berlangsung (proses *switching window-*nya dilakukan menggunakan kombinasi *keyboard*). Selain itu, *tiling window manager* ini memberikan tampilan desktop yang cukup rapi karena tidak ada konsep jendela program yang saling timpang tindih satu sama lain. Akhirnya, timbul keingingan untuk berpindah menggunakan *tiling window manager*.

## Hello i3!

Pilihan akhirnya jatuh ke *tiling window manager* i3. Pengalaman pertama dalam menggunakan i3 tentunya cukup untuk membuat kepala pusing, mengingat tidak ada tombol *close*, *minimize* dan *maximize* layaknya desktop pada umumnya. Setelah saya baca dokumentasi, ternyata memang semua operasi yang berkaitan dengan window dilakukan menggunakan keyboard dan ini harus dikonfigurasi dulu *keybinding*-nya tepatnya di *file* `~/.config/i3/config`. Karena cukup ribet, akhirnya saya menggunakan beberapa setelan keybinding i3 milik orang lain untuk setup awal (yang bisa disebut juga nyomot `dotfiles` orang lain, hehe).

![Dimana ada seseorang yang membagikan .dotfiles-nya, disitu ada kesempatan untuk nyomot wkwk.](https://i.imgur.com/QLhiURT.png)

## Operasi dasar

WM i3 ini memiliki konsep tombol modifier yang merupakan *trigger* untuk masuk mode kontrol window. Terdapat dua tombol modifier yang disediakan yaitu tombol `super` (dikenal dengan tombol start) dan tombol `alt` . Saya menggunakan tombol `super` sebagai modifier utama. Kalau di setelan `dotfiles` i3 tombol `super` ini dikenal dengan nama `Mod4.`

```text
~/.config/i3/config
------------------------------------------------------------------

set $mod Mod4
```

Setelah *modifier* disetel, pengguna dapat menentukan kombinasi tombol *keyboard* dengan mengikutsertakan tombol *modifier* tersebut ke dalam kombinasi keyboard. Kombinasi tombol yang paling penting yang harus disetel tentunya buka tutup aplikasi serta akses ke *terminal* tentunya. Untuk membuka aplikasi, saya menggunakan utilitas `dmenu`, sebuah utilitas yang mirip seperti *start menu* tetapi hanya untuk perintah atau *command* yang tersedia di *host* terkait (selanjutnya saya lebih sering menggunakan utility `rofi` yang 'mungkin' saya akan bahas di *post* yang berbeda).

```text
~/.config/i3/config
------------------------------------------------------------------
# membuka menu ke seluruh command list yang ada di host
bindsym $mod+d exec dmenu_run

# membuka terminal default
bindsym $mod+Return exec i3-sensible-terminal

# menutup window yang terpilih
bindsym $mod+Shift+q kill
```

## Berganti-ganti Jendela Program

Setelah beberapa perulangan, akhirnya mulai dapat juga *feel* dari menggunakan *tiling window manager*. Yang jelas berpindah-pindah jendela program dari workspace satu ke *workspace* lain cukup mudah dan bisa disetel sesuai dengan kebutuhan pengguna. Pada konfigurasi saya, saya menggunakan kombinasi tombol `super` untuk berganti *focus* dari jendela program satu ke jendela program yang lain.

```text
~/.config/i3/config
------------------------------------------------------------------
# berpindah-pindah dari window ke window dalam satu workspaces
bindsym $mod+Left focus left
bindsym $mod+Down focus down
bindsym $mod+Up focus up
bindsym $mod+Right focus right
```

Sepertinya sudah menjadi keharusan di i3 untuk melakukan *setup workspace*. Karena jika pengguna menggunakan i3 tanpa *workspace*, pasti akan membuat pengguna merasa ribet dalam mengatur struktur dari jendela program yang dibuka. Pada konfigurasi saya, saya menggunakan setup i3 untuk dua monitor yang sebenarnya kalau monitor kedua dicabut, konfigurasi akan langsung menyesuaikan dengan *setup* satu monitor.

```text
~/.config/i3/config
------------------------------------------------------------------
# Setup variabel monitor, daftar monitor yang terhubung
# dapat dilihat dengan perintah xrandr -q
set $monR eDP-1
set $monL DP-1

# Setup penamaan workspaces
set $ws1L 1:A
set $ws1R 11:A
set $ws2L 2:B
set $ws2R 12:B
set $ws3L 3:C
set $ws3R 13:C
set $ws4L 4:C
set $ws4R 14:C

# Setup tiap workspaces ke dalam monitor terkait.
# Variabel workspaces dengan akhiran L (Left) akan menempati monitor dengan
# akhiran L. Begitu juga untuk workspaces berakhiran R
workspace $ws1L output $monL
workspace $ws1R output $monR
workspace $ws2L output $monL
workspace $ws2R output $monR
workspace $ws3L output $monL
workspace $ws3R output $monR
workspace $ws4L output $monL
workspace $ws4R output $monR
```

Setelah melakukan konfigurasi variabel baik *workspace* maupun monitor, pengguna dapat melakukan *setup* *keybinding* untuk berpindah dari *workspace* satu ke *workspace* lain, atau juga memindah jendela program ke *workspace* lain.

```text
~/.config/i3/config
------------------------------------------------------------------

# Berpindah ke workspace tujuan dengan kombinasi modifier + angka
bindsym $mod+1 workspace $ws1L
bindsym $mod+2 workspace $ws1R
bindsym $mod+3 workspace $ws2L
bindsym $mod+4 workspace $ws2R
bindsym $mod+5 workspace $ws3L
bindsym $mod+6 workspace $ws3R
bindsym $mod+7 workspace $ws4L
bindsym $mod+8 workspace $ws4R

# Memindahkan container/window ke workspace tujuan
bindsym $mod+Shift+1 move container to workspace $ws1L
bindsym $mod+Shift+2 move container to workspace $ws1R
bindsym $mod+Shift+3 move container to workspace $ws2L
bindsym $mod+Shift+4 move container to workspace $ws2R
bindsym $mod+Shift+5 move container to workspace $ws3L
bindsym $mod+Shift+6 move container to workspace $ws3R
bindsym $mod+Shift+7 move container to workspace $ws4L
bindsym $mod+Shift+8 move container to workspace $ws4R
```

## *A Tricky Way to Minimize Window*

Ada beberapa fitur yang sebenarnya terasa seperti hilang ketika masih ketika menggunakan *non-tiling window manager.* Salah satunya adalah *minimize*. Namun di i3, hal tersebut bisa diakali dengan menggunakan konsep *tabbed window* dan *stack window*. Pada i3, hal ini dikenal dengan nama *container layout*. (TBH, saya sangat suka konsep *container window* ini karena sangat memudahkan untuk berpindah sekaligus menyembuyikan jendela program yang tidak dibutuhkan).

```text
~/.config/i3/config
------------------------------------------------------------------

# berganti mode layout yang digunakan (stacked, tabbed, toggle split)
bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split
```

## *Floating Window.* Apakah bisa*?*

Sebenarnya konsep *floating window* agak sedikit "*anti-tiling window manager*" mengingat dari tujuan *tiling-window* manager sendiri adalah untuk melakukan organisasi jendela program yang tiap jendelanya tidak tumpang tindih satu sama lain. Namun jika sewaktu-waktu pengguna ingin menempatkan jendela program layaknya *non-tiling window manager*, pengguna dapat menyetel *trigger* untuk berpindah ke mode *floating window*.

```text
~/.config/i3/config
------------------------------------------------------------------

# berganti antara tiling / floating pada sebuah jendela
bindsym $mod+Shift+space floating toggle

# berganti fokus antara jendela tiling / floating
bindsym $mod+space focus mode_toggle
```

## *Resize Window*

Nah, pasti kan dalam organisasi jendela program pasti ada beberapa program yang hanya membutuhkan ruang yang sedikit contohnya seperti terminal, ataupun juga ruang jendela program yang cukup leluasa seperti *text editor*, *web browser*, IDE, dsb. Ada konfigurasi khusus dalam mengubah jendela yang mana pada konfigurasi saya kali ini, pengguna harus menekan tombol `modifier` kemudian tombol `r`. Kemudian pengguna tinggal menggunakan tombol panah `up`, `down`, `left`, `right` untuk membesarkan atau mengecilkan ukuran jendela program. Jika sudah selesai, pengguna dapat menekan tombol `enter`. Konfigurasinya adalah sebagai berikut.

```text
~/.config/i3/config
------------------------------------------------------------------
# kombinasi tombol yang akan aktif ketika mode pengguna
# masuk ke dalam mode resize
mode "resize" {

        # menggunakan tombol jkl; untuk navigasi layaknya panah
        bindsym j resize shrink width 10 px or 10 ppt
        bindsym k resize grow height 10 px or 10 ppt
        bindsym l resize shrink height 10 px or 10 ppt
        bindsym semicolon resize grow width 10 px or 10 ppt

        # menggunakan tombol panah untuk mengubah ukuran jendela
        # left right untuk lebar dan up down untuk tinggi
        bindsym Left resize shrink width 10 px or 10 ppt
        bindsym Down resize grow height 10 px or 10 ppt
        bindsym Up resize shrink height 10 px or 10 ppt
        bindsym Right resize grow width 10 px or 10 ppt

        # back to normal: Enter or Escape
        bindsym Return mode "default"
        bindsym Escape mode "default"
}

# kombinasi keyboard untuk membuat jendela yang sedang
# dalam fokus masuk ke mode resize
bindsym $mod+r mode "resize"
```

## Kontrol Tombol *Media* dan *Backlight*

Beberapa laptop sekarang pasti sudah disediakan tombol kombinasi `fn` untuk melakukan beberapa hal seperti membesarkan dan mengecilkan volume suara, *play*/*pause* sebuah media yang sedang diputar atau mungkin mengatur kecerahan dari layar laptop. Rasanya mungkin akan kurang jika beberapa fungsi tombol tersebut tidak dikonfigurasi juga.

Pada setup laptop saya, saya menggunakan *pulseaudio* sebagai software untuk mengatur suara dari laptop. Dan untuk kontrol *volume*-nya, saya menggunakan utilitas `pulseaudio-ctl`.  Sedangkan untuk kecerahan layar, saya menggunakan utilitas `light` yang dapat di-*download* di tautan berikut [https://github.com/haikarainen/light](https://github.com/haikarainen/light). Untuk kontrol play/pause media, perintah berikut ini saya dapatkan dari [Spotify Community](https://community.spotify.com/t5/Desktop-Linux/Basic-controls-via-command-line/td-p/4295625). Yap, ini sebuah *fix* agar kontrol media bisa bekerja juga pada Spotify.

```text
~/.config/i3/config
------------------------------------------------------------------
# Pulse Audio controls
bindsym XF86AudioRaiseVolume exec --no-startup-id pulseaudio-ctl up 1 #increase sound volume
bindsym XF86AudioLowerVolume exec --no-startup-id pulseaudio-ctl down 1 #decrease sound volume
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute 0 toggle # mute sound

# Sreen brightness controls
bindsym XF86MonBrightnessUp exec light -s "sysfs/backlight/auto" -A 1 # increase screen brightness
bindsym XF86MonBrightnessDown exec light -s "sysfs/backlight/auto" -U 1 # decrease screen brightness

# Media player controls
bindsym XF86AudioPlay exec dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause
bindsym XF86AudioPause exec playerctl pause
bindsym XF86AudioStop exec dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Stop
bindsym XF86AudioNext exec dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Next
bindsym XF86AudioPrev exec dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Previous
```

## Etc(s)

Beberapa konfigurasi saya selain yang telah disebutkan antara lain sebagai berikut. Untuk startup program yang akan dieksekusi, saya memasang *command* `nitrogen` (sebuah utilitas *wallpaper* *engine*), `picom` yang merupakan desktop compositor serta `Polybar` sebagai utilitas pengganti *taskbar*.

Untuk mengambil tangkapan layar, saya menggunakan utilitas `xfce4-screenshooter` yang *keybinding*-nya disetel dengan tombol `PrintScreen`. Satu tanpa kombinasi *modifier* yang berfungsi untuk mengambil tangkapan layar secara langsung dan satunya menggunakan *modifier* yang berfungsi untuk mengambil tangkapan layar dengan pada area tertentu.

```text
~/.config/i3/config
------------------------------------------------------------------
exec --no-startup-id nitrogen --restore
exec_always --no-startup-id $HOME/.config/polybar/launch.sh
exec_always --no-startup-id picom -b

#interactive screenshot by pressing printscreen
bindsym Print exec --no-startup-id xfce4-screenshooter -c
#crop-area screenshot by pressing Mod + printscreen
bindsym $mod+Print exec --no-startup-id xfce4-screenshooter -r
```

Saya menggunakan sistem manajemen waktu Getting Things Done (GTD) dan salah satu kunci manajemen waktu GTD adalah *Quick Add Task* dimana seseorang harus secara cepat menambahkan sesuatu ke dalam daftar *Inbox* jika sebuah hal yang ingin dikerjakan muncul di kepala. Pada setup saya, saya menambahkan sebuah keybinding yang secara langsung membuka sebuah *input text* (yang sebenarnya merupakan utilitas `rofi`) untuk menambahkan sebuah *task*. *Task* tersebut akan disimpan pada Notion.so yang merupakan sebuah *note management apps*. *Script* ini saya buat sendiri dengan memanfaatkan API *unofficial* dari Notion yang bisa diakses di [tautan](https://github.com/jamalex/notion-py) berikut.

```text
~/.config/i3/config
------------------------------------------------------------------
# Notion quick add task script
bindsym $mod+q exec --no-startup-id "~/.config/i3/scripts/notion_companion_launch.sh"
```

![FYI, saya orang yang agak pelupa untuk mengingat banyak hal. Utilitas ini jujur sangat membantu untuk mengingat hal yang akan dikerjakan, mulai dari inspirasi yang tiba-tiba nongol gak tahu dari mana hingga hal-hal penting yang harus dikerjakan](https://i.imgur.com/QNxW58M.png)

> PS: Untuk bahasan mengenai *desktop compositor* `picom` (yang sebenarnya adalah turunan dari `compton`), launcher `rofi`, utilitas `polybar` maupun *note management* Notion mungkin akan saya bahas di *post* yang berbeda. *Stay Tune* 😉
