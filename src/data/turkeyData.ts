export interface City {
  id: number;
  name: string;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
  neighborhoods: Neighborhood[];
}

export interface Neighborhood {
  id: number;
  name: string;
}

export const turkeyCities: City[] = [
  {
    id: 1,
    name: "Adana",
    districts: [
      {
        id: 1,
        name: "Seyhan",
        neighborhoods: [
          { id: 1, name: "Bahçelievler" },
          { id: 2, name: "Çukurova" },
          { id: 3, name: "Güzelyalı" },
          { id: 4, name: "Kurttepe" },
          { id: 5, name: "Mithatpaşa" }
        ]
      },
      {
        id: 2,
        name: "Çukurova",
        neighborhoods: [
          { id: 6, name: "Belediye Evleri" },
          { id: 7, name: "Güzelyalı" },
          { id: 8, name: "Kurttepe" },
          { id: 9, name: "Sarıçam" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Adıyaman",
    districts: [
      {
        id: 3,
        name: "Merkez",
        neighborhoods: [
          { id: 10, name: "Atatürk" },
          { id: 11, name: "Cumhuriyet" },
          { id: 12, name: "Gölbaşı" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Afyonkarahisar",
    districts: [
      {
        id: 4,
        name: "Merkez",
        neighborhoods: [
          { id: 13, name: "Asım Gündüz" },
          { id: 14, name: "Cumhuriyet" },
          { id: 15, name: "Kurtuluş" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Ağrı",
    districts: [
      {
        id: 5,
        name: "Merkez",
        neighborhoods: [
          { id: 16, name: "Atatürk" },
          { id: 17, name: "Cumhuriyet" },
          { id: 18, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Amasya",
    districts: [
      {
        id: 6,
        name: "Merkez",
        neighborhoods: [
          { id: 19, name: "Atatürk" },
          { id: 20, name: "Cumhuriyet" },
          { id: 21, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Ankara",
    districts: [
      {
        id: 7,
        name: "Çankaya",
        neighborhoods: [
          { id: 22, name: "Bahçelievler" },
          { id: 23, name: "Emek" },
          { id: 24, name: "Kızılay" },
          { id: 25, name: "Kurtuluş" },
          { id: 26, name: "Maltepe" }
        ]
      },
      {
        id: 8,
        name: "Keçiören",
        neighborhoods: [
          { id: 27, name: "Aktaş" },
          { id: 28, name: "Atapark" },
          { id: 29, name: "Bağlarbaşı" },
          { id: 30, name: "Cumhuriyet" }
        ]
      },
      {
        id: 9,
        name: "Mamak",
        neighborhoods: [
          { id: 31, name: "Abidinpaşa" },
          { id: 32, name: "Altıağaç" },
          { id: 33, name: "Bahçeleriçi" },
          { id: 34, name: "Bayındır" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Antalya",
    districts: [
      {
        id: 10,
        name: "Muratpaşa",
        neighborhoods: [
          { id: 35, name: "Altındağ" },
          { id: 36, name: "Bahçelievler" },
          { id: 37, name: "Çağlayan" },
          { id: 38, name: "Fener" },
          { id: 39, name: "Güzeloba" }
        ]
      },
      {
        id: 11,
        name: "Kepez",
        neighborhoods: [
          { id: 40, name: "Ahatlı" },
          { id: 41, name: "Altınova" },
          { id: 42, name: "Atatürk" },
          { id: 43, name: "Barınaklar" }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Artvin",
    districts: [
      {
        id: 12,
        name: "Merkez",
        neighborhoods: [
          { id: 44, name: "Atatürk" },
          { id: 45, name: "Cumhuriyet" },
          { id: 46, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Aydın",
    districts: [
      {
        id: 13,
        name: "Efeler",
        neighborhoods: [
          { id: 47, name: "Adnan Menderes" },
          { id: 48, name: "Atatürk" },
          { id: 49, name: "Cumhuriyet" },
          { id: 50, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Balıkesir",
    districts: [
      {
        id: 14,
        name: "Altıeylül",
        neighborhoods: [
          { id: 51, name: "Atatürk" },
          { id: 52, name: "Cumhuriyet" },
          { id: 53, name: "Gazi" },
          { id: 54, name: "Kurtuluş" }
        ]
      }
    ]
  },
  {
    id: 11,
    name: "Bilecik",
    districts: [
      {
        id: 15,
        name: "Merkez",
        neighborhoods: [
          { id: 55, name: "Atatürk" },
          { id: 56, name: "Cumhuriyet" },
          { id: 57, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Bingöl",
    districts: [
      {
        id: 16,
        name: "Merkez",
        neighborhoods: [
          { id: 58, name: "Atatürk" },
          { id: 59, name: "Cumhuriyet" },
          { id: 60, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 13,
    name: "Bitlis",
    districts: [
      {
        id: 17,
        name: "Merkez",
        neighborhoods: [
          { id: 61, name: "Atatürk" },
          { id: 62, name: "Cumhuriyet" },
          { id: 63, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 14,
    name: "Bolu",
    districts: [
      {
        id: 18,
        name: "Merkez",
        neighborhoods: [
          { id: 64, name: "Atatürk" },
          { id: 65, name: "Cumhuriyet" },
          { id: 66, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 15,
    name: "Burdur",
    districts: [
      {
        id: 19,
        name: "Merkez",
        neighborhoods: [
          { id: 67, name: "Atatürk" },
          { id: 68, name: "Cumhuriyet" },
          { id: 69, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 16,
    name: "Bursa",
    districts: [
      {
        id: 20,
        name: "Nilüfer",
        neighborhoods: [
          { id: 70, name: "19 Mayıs" },
          { id: 71, name: "23 Nisan" },
          { id: 72, name: "29 Ekim" },
          { id: 73, name: "Ataevler" },
          { id: 74, name: "Balat" }
        ]
      },
      {
        id: 21,
        name: "Osmangazi",
        neighborhoods: [
          { id: 75, name: "Adalet" },
          { id: 76, name: "Ahmetbey" },
          { id: 77, name: "Alacahırka" },
          { id: 78, name: "Alacamescit" }
        ]
      }
    ]
  },
  {
    id: 17,
    name: "Çanakkale",
    districts: [
      {
        id: 22,
        name: "Merkez",
        neighborhoods: [
          { id: 79, name: "Atatürk" },
          { id: 80, name: "Cumhuriyet" },
          { id: 81, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 18,
    name: "Çankırı",
    districts: [
      {
        id: 23,
        name: "Merkez",
        neighborhoods: [
          { id: 82, name: "Atatürk" },
          { id: 83, name: "Cumhuriyet" },
          { id: 84, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 19,
    name: "Çorum",
    districts: [
      {
        id: 24,
        name: "Merkez",
        neighborhoods: [
          { id: 85, name: "Atatürk" },
          { id: 86, name: "Cumhuriyet" },
          { id: 87, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 20,
    name: "Denizli",
    districts: [
      {
        id: 25,
        name: "Merkezefendi",
        neighborhoods: [
          { id: 88, name: "Adalet" },
          { id: 89, name: "Akçeşme" },
          { id: 90, name: "Akkonak" },
          { id: 91, name: "Akoğlan" }
        ]
      }
    ]
  },
  {
    id: 21,
    name: "Diyarbakır",
    districts: [
      {
        id: 26,
        name: "Bağlar",
        neighborhoods: [
          { id: 92, name: "Ağaçgeçit" },
          { id: 93, name: "Alanköy" },
          { id: 94, name: "Alcı" },
          { id: 95, name: "Aşağıdolay" }
        ]
      }
    ]
  },
  {
    id: 22,
    name: "Edirne",
    districts: [
      {
        id: 27,
        name: "Merkez",
        neighborhoods: [
          { id: 96, name: "Atatürk" },
          { id: 97, name: "Cumhuriyet" },
          { id: 98, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 23,
    name: "Elazığ",
    districts: [
      {
        id: 28,
        name: "Merkez",
        neighborhoods: [
          { id: 99, name: "Atatürk" },
          { id: 100, name: "Cumhuriyet" },
          { id: 101, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 24,
    name: "Erzincan",
    districts: [
      {
        id: 29,
        name: "Merkez",
        neighborhoods: [
          { id: 102, name: "Atatürk" },
          { id: 103, name: "Cumhuriyet" },
          { id: 104, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 25,
    name: "Erzurum",
    districts: [
      {
        id: 30,
        name: "Yakutiye",
        neighborhoods: [
          { id: 105, name: "Atatürk" },
          { id: 106, name: "Cumhuriyet" },
          { id: 107, name: "Gazi" },
          { id: 108, name: "Kurtuluş" }
        ]
      }
    ]
  },
  {
    id: 26,
    name: "Eskişehir",
    districts: [
      {
        id: 31,
        name: "Tepebaşı",
        neighborhoods: [
          { id: 109, name: "19 Mayıs" },
          { id: 110, name: "23 Nisan" },
          { id: 111, name: "29 Ekim" },
          { id: 112, name: "Aşağısöğütönü" }
        ]
      }
    ]
  },
  {
    id: 27,
    name: "Gaziantep",
    districts: [
      {
        id: 32,
        name: "Şahinbey",
        neighborhoods: [
          { id: 113, name: "23 Nisan" },
          { id: 114, name: "29 Ekim" },
          { id: 115, name: "Aktoprak" },
          { id: 116, name: "Alaybey" }
        ]
      }
    ]
  },
  {
    id: 28,
    name: "Giresun",
    districts: [
      {
        id: 33,
        name: "Merkez",
        neighborhoods: [
          { id: 117, name: "Atatürk" },
          { id: 118, name: "Cumhuriyet" },
          { id: 119, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 29,
    name: "Gümüşhane",
    districts: [
      {
        id: 34,
        name: "Merkez",
        neighborhoods: [
          { id: 120, name: "Atatürk" },
          { id: 121, name: "Cumhuriyet" },
          { id: 122, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 30,
    name: "Hakkari",
    districts: [
      {
        id: 35,
        name: "Merkez",
        neighborhoods: [
          { id: 123, name: "Atatürk" },
          { id: 124, name: "Cumhuriyet" },
          { id: 125, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 31,
    name: "Hatay",
    districts: [
      {
        id: 36,
        name: "Antakya",
        neighborhoods: [
          { id: 126, name: "Atatürk" },
          { id: 127, name: "Cumhuriyet" },
          { id: 128, name: "Gazi" },
          { id: 129, name: "Kurtuluş" }
        ]
      }
    ]
  },
  {
    id: 32,
    name: "Isparta",
    districts: [
      {
        id: 37,
        name: "Merkez",
        neighborhoods: [
          { id: 130, name: "Atatürk" },
          { id: 131, name: "Cumhuriyet" },
          { id: 132, name: "Gazi" }
        ]
      }
    ]
  },
  {
    id: 33,
    name: "Mersin",
    districts: [
      {
        id: 38,
        name: "Akdeniz",
        neighborhoods: [
          { id: 133, name: "Adanalıoğlu" },
          { id: 134, name: "Anadolu" },
          { id: 135, name: "Barış" },
          { id: 136, name: "Camişerif" }
        ]
      }
    ]
  },
  {
    id: 34,
    name: "İstanbul",
    districts: [
      {
        id: 39,
        name: "Kadıköy",
        neighborhoods: [
          { id: 137, name: "19 Mayıs" },
          { id: 138, name: "Acıbadem" },
          { id: 139, name: "Bostancı" },
          { id: 140, name: "Caddebostan" },
          { id: 141, name: "Caferağa" },
          { id: 142, name: "Eğitim" },
          { id: 143, name: "Fenerbahçe" },
          { id: 144, name: "Fikirtepe" },
          { id: 145, name: "Göztepe" },
          { id: 146, name: "Hasanpaşa" },
          { id: 147, name: "Koşuyolu" },
          { id: 148, name: "Merdivenköy" },
          { id: 149, name: "Osmanağa" },
          { id: 150, name: "Rasimpaşa" },
          { id: 151, name: "Sahrayıcedit" },
          { id: 152, name: "Suadiye" },
          { id: 153, name: "Zühtüpaşa" }
        ]
      },
      {
        id: 40,
        name: "Beşiktaş",
        neighborhoods: [
          { id: 154, name: "Abbasağa" },
          { id: 155, name: "Akat" },
          { id: 156, name: "Arnavutköy" },
          { id: 157, name: "Bebek" },
          { id: 158, name: "Etiler" },
          { id: 159, name: "Gayrettepe" },
          { id: 160, name: "Levent" },
          { id: 161, name: "Ortaköy" },
          { id: 162, name: "Sinanpaşa" },
          { id: 163, name: "Vişnezade" },
          { id: 164, name: "Yıldız" }
        ]
      },
      {
        id: 41,
        name: "Şişli",
        neighborhoods: [
          { id: 165, name: "19 Mayıs" },
          { id: 166, name: "Bozkurt" },
          { id: 167, name: "Cumhuriyet" },
          { id: 168, name: "Duatepe" },
          { id: 169, name: "Ergenekon" },
          { id: 170, name: "Esentepe" },
          { id: 171, name: "Feriköy" },
          { id: 172, name: "Fulya" },
          { id: 173, name: "Gülbahar" },
          { id: 174, name: "Halaskargazi" },
          { id: 175, name: "Harbiye" },
          { id: 176, name: "Mecidiyeköy" },
          { id: 177, name: "Merkez" },
          { id: 178, name: "Nişantaşı" },
          { id: 179, name: "Pangaltı" },
          { id: 180, name: "Teşvikiye" }
        ]
      },
      {
        id: 42,
        name: "Üsküdar",
        neighborhoods: [
          { id: 181, name: "Acıbadem" },
          { id: 182, name: "Ahmediye" },
          { id: 183, name: "Altunizade" },
          { id: 184, name: "Aziz Mahmut Hüdayi" },
          { id: 185, name: "Bahçelievler" },
          { id: 186, name: "Barbaros" },
          { id: 187, name: "Beylerbeyi" },
          { id: 188, name: "Bulgurlu" },
          { id: 189, name: "Cumhuriyet" },
          { id: 190, name: "Emniyet" },
          { id: 191, name: "Ferah" },
          { id: 192, name: "Güzeltepe" },
          { id: 193, name: "İcadiye" },
          { id: 194, name: "Kandilli" },
          { id: 195, name: "Kirazlıtepe" },
          { id: 196, name: "Küçüksu" },
          { id: 197, name: "Küplüce" },
          { id: 198, name: "Mimarsinan" },
          { id: 199, name: "Muratreis" },
          { id: 200, name: "Selamiali" },
          { id: 201, name: "Sultantepe" },
          { id: 202, name: "Yavuztürk" }
        ]
      }
    ]
  },
  {
    id: 35,
    name: "İzmir",
    districts: [
      {
        id: 43,
        name: "Konak",
        neighborhoods: [
          { id: 203, name: "19 Mayıs" },
          { id: 204, name: "26 Ağustos" },
          { id: 205, name: "Akademi" },
          { id: 206, name: "Alsancak" },
          { id: 207, name: "Altay" },
          { id: 208, name: "Atatürk" },
          { id: 209, name: "Basmane" },
          { id: 210, name: "Buca" },
          { id: 211, name: "Çankaya" },
          { id: 212, name: "Eşrefpaşa" },
          { id: 213, name: "Gazi" },
          { id: 214, name: "Gültepe" },
          { id: 215, name: "Gürçeşme" },
          { id: 216, name: "Güzelyalı" },
          { id: 217, name: "Kahramanlar" },
          { id: 218, name: "Kemeraltı" },
          { id: 219, name: "Kültür" },
          { id: 220, name: "Liman" },
          { id: 221, name: "Mehmet Ali Akman" },
          { id: 222, name: "Mithatpaşa" },
          { id: 223, name: "Murat" },
          { id: 224, name: "Namazgah" },
          { id: 225, name: "Ondokuzmayıs" },
          { id: 226, name: "Pazaryeri" },
          { id: 227, name: "Sarıkışla" },
          { id: 228, name: "Soğukkuyu" },
          { id: 229, name: "Uğur" },
          { id: 230, name: "Umurbey" },
          { id: 231, name: "Yeşilyurt" },
          { id: 232, name: "Zeytinlik" }
        ]
      },
      {
        id: 44,
        name: "Bornova",
        neighborhoods: [
          { id: 233, name: "Atatürk" },
          { id: 234, name: "Barbaros" },
          { id: 235, name: "Çiçekliköy" },
          { id: 236, name: "Erzene" },
          { id: 237, name: "Evka 3" },
          { id: 238, name: "Evka 4" },
          { id: 239, name: "Gazi" },
          { id: 240, name: "Kazımdirik" },
          { id: 241, name: "Naldöken" },
          { id: 242, name: "Pınarbaşı" }
        ]
      }
    ]
  }
];

// Tüm Türkiye illeri (81 il) - Alfabetik sıralı
export const allCities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli",
  "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop",
  "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

export const propertyTypes = [
  "Daire",
  "Villa", 
  "Müstakil Ev",
  "Rezidans",
  "Dubleks",
  "Tripleks",
  "Bahçeli Daire",
  "Stüdyo Daire",
  "Loft",
  "Yazlık",
  "Çiftlik Evi",
  "Prefabrik Ev"
];

export const propertyStatus = [
  "Satılık",
  "Kiralık",
  "Günlük Kiralık",
  "Devremülk",
  "Kiralık Satılık",
  "Müşterek Mülkiyet",
  "Kat Karşılığı"
]; 