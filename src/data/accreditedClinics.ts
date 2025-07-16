export interface ClinicInfo {
  name: string;
  location: string;
  services: ('blood' | 'sperm' | 'eggs')[];
  website: string;
  accreditation: string;
  contact: string;
}

export const clinicsByCountry: Record<string, ClinicInfo[]> = {
  "United States": [
    {
      name: "American Red Cross",
      location: "Nationwide",
      services: ['blood'],
      website: "redcross.org",
      accreditation: "FDA Approved",
      contact: "1-800-RED-CROSS"
    },
    {
      name: "California Cryobank",
      location: "Los Angeles, CA",
      services: ['sperm'],
      website: "cryobank.com",
      accreditation: "FDA Registered",
      contact: "(310) 443-5244"
    },
    {
      name: "Shady Grove Fertility",
      location: "Multiple US Locations",
      services: ['sperm', 'eggs'],
      website: "shadygrovefertility.com",
      accreditation: "SART Certified",
      contact: "1-888-761-1967"
    },
    {
      name: "Reproductive Medicine Associates",
      location: "New York, NY",
      services: ['eggs', 'sperm'],
      website: "rmany.com",
      accreditation: "CAP Accredited",
      contact: "(212) 756-5777"
    },
    {
      name: "Vitalant",
      location: "Nationwide",
      services: ['blood'],
      website: "vitalant.org",
      accreditation: "AABB Certified",
      contact: "1-877-25-VITAL"
    }
  ],
  "Canada": [
    {
      name: "Canadian Blood Services",
      location: "Nationwide",
      services: ['blood'],
      website: "blood.ca",
      accreditation: "Health Canada Approved",
      contact: "1-888-236-6283"
    },
    {
      name: "ReproMed",
      location: "Toronto, ON",
      services: ['sperm', 'eggs'],
      website: "repromed.ca",
      accreditation: "CFAS Certified",
      contact: "(416) 972-0110"
    },
    {
      name: "Pacific Centre for Reproductive Medicine",
      location: "Vancouver, BC",
      services: ['eggs', 'sperm'],
      website: "pacificfertility.ca",
      accreditation: "CFAS Accredited",
      contact: "(604) 422-7276"
    },
    {
      name: "Héma-Québec",
      location: "Quebec",
      services: ['blood'],
      website: "hema-quebec.qc.ca",
      accreditation: "Health Canada Licensed",
      contact: "1-800-343-7264"
    }
  ],
  "United Kingdom": [
    {
      name: "NHS Blood and Transplant",
      location: "Nationwide",
      services: ['blood'],
      website: "nhsbt.nhs.uk",
      accreditation: "MHRA Licensed",
      contact: "0300 123 23 23"
    },
    {
      name: "London Sperm Bank",
      location: "London",
      services: ['sperm'],
      website: "londonspermbank.com",
      accreditation: "HFEA Licensed",
      contact: "+44 20 7224 0707"
    },
    {
      name: "Care Fertility",
      location: "Multiple UK Locations",
      services: ['eggs', 'sperm'],
      website: "carefertility.com",
      accreditation: "HFEA Regulated",
      contact: "0800 564 2270"
    },
    {
      name: "Bourn Hall Clinic",
      location: "Cambridge",
      services: ['eggs', 'sperm'],
      website: "bourn-hall-clinic.co.uk",
      accreditation: "HFEA Licensed",
      contact: "+44 1223 755 755"
    }
  ],
  "China": [
    {
      name: "Beijing Red Cross Blood Center",
      location: "Beijing",
      services: ['blood'],
      website: "brcbc.org",
      accreditation: "NMPA Certified",
      contact: "+86 10 6202 2468"
    },
    {
      name: "Peking University Third Hospital",
      location: "Beijing",
      services: ['sperm', 'eggs'],
      website: "puh3.net.cn",
      accreditation: "National Health Commission",
      contact: "+86 10 8226 6699"
    },
    {
      name: "Shanghai First Maternity Hospital",
      location: "Shanghai",
      services: ['eggs', 'sperm'],
      website: "fc.shmu.edu.cn",
      accreditation: "Chinese Medical Association",
      contact: "+86 21 5403 6000"
    },
    {
      name: "Guangzhou Blood Center",
      location: "Guangzhou",
      services: ['blood'],
      website: "gzbc.org.cn",
      accreditation: "NMPA Licensed",
      contact: "+86 20 8318 4451"
    }
  ],
  "Australia": [
    {
      name: "Australian Red Cross Lifeblood",
      location: "Nationwide",
      services: ['blood'],
      website: "lifeblood.com.au",
      accreditation: "TGA Approved",
      contact: "13 14 95"
    },
    {
      name: "Melbourne IVF",
      location: "Melbourne, VIC",
      services: ['eggs', 'sperm'],
      website: "mivf.com.au",
      accreditation: "RTAC Certified",
      contact: "+61 3 9473 4444"
    },
    {
      name: "City Fertility Centre",
      location: "Multiple Locations",
      services: ['sperm', 'eggs'],
      website: "cityfertility.com.au",
      accreditation: "RTAC Accredited",
      contact: "1800 FERTILITY"
    },
    {
      name: "Genea Fertility",
      location: "Sydney, NSW",
      services: ['eggs', 'sperm'],
      website: "genea.com.au",
      accreditation: "NATA Certified",
      contact: "+61 2 9425 9700"
    }
  ],
  "Germany": [
    {
      name: "German Red Cross Blood Service",
      location: "Nationwide",
      services: ['blood'],
      website: "blutspende.de",
      accreditation: "Paul-Ehrlich-Institut",
      contact: "+49 800 11 949 11"
    },
    {
      name: "Kinderwunschzentrum Berlin",
      location: "Berlin",
      services: ['eggs', 'sperm'],
      website: "kwz-berlin.de",
      accreditation: "BÄK Certified",
      contact: "+49 30 885 092 0"
    },
    {
      name: "Fertility Center Hamburg",
      location: "Hamburg",
      services: ['sperm', 'eggs'],
      website: "fertility-center-hamburg.de",
      accreditation: "DGGG Accredited",
      contact: "+49 40 468 051"
    },
    {
      name: "Cryobank München",
      location: "Munich",
      services: ['sperm'],
      website: "cryobank-muenchen.de",
      accreditation: "BÄK Licensed",
      contact: "+49 89 547 367"
    }
  ],
  "France": [
    {
      name: "Établissement Français du Sang",
      location: "Nationwide",
      services: ['blood'],
      website: "dondusang.net",
      accreditation: "ANSM Approved",
      contact: "+33 800 109 000"
    },
    {
      name: "CECOS Paris",
      location: "Paris",
      services: ['sperm'],
      website: "cecos.org",
      accreditation: "ANSM Licensed",
      contact: "+33 1 44 12 61 00"
    },
    {
      name: "Institut Marquès",
      location: "Paris",
      services: ['eggs', 'sperm'],
      website: "institutomarques.com",
      accreditation: "ANSM Certified",
      contact: "+33 1 44 53 86 26"
    },
    {
      name: "Clinique de la Muette",
      location: "Paris",
      services: ['eggs', 'sperm'],
      website: "clinique-muette.com",
      accreditation: "ANSM Accredited",
      contact: "+33 1 44 96 31 31"
    }
  ],
  "Mexico": [
    {
      name: "Centro Nacional de la Transfusión Sanguínea",
      location: "Mexico City",
      services: ['blood'],
      website: "cenats.salud.gob.mx",
      accreditation: "COFEPRIS Certified",
      contact: "+52 55 5062 1600"
    },
    {
      name: "Ingenes",
      location: "Multiple Locations",
      services: ['eggs', 'sperm'],
      website: "ingenes.com",
      accreditation: "COFEPRIS Licensed",
      contact: "+52 800 400 7400"
    },
    {
      name: "Instituto Valenciano de Infertilidad",
      location: "Mexico City",
      services: ['sperm', 'eggs'],
      website: "ivi.mx",
      accreditation: "COFEPRIS Approved",
      contact: "+52 55 4160 8800"
    },
    {
      name: "Red Cross Mexico",
      location: "Nationwide",
      services: ['blood'],
      website: "cruzrojamexicana.org.mx",
      accreditation: "COFEPRIS Certified",
      contact: "+52 55 5395 1111"
    }
  ],
  "Puerto Rico": [
    {
      name: "American Red Cross Puerto Rico",
      location: "San Juan",
      services: ['blood'],
      website: "redcross.org",
      accreditation: "FDA Approved",
      contact: "(787) 758-8080"
    },
    {
      name: "Banco de Sangre de Puerto Rico",
      location: "San Juan",
      services: ['blood'],
      website: "bancodesangrepr.org",
      accreditation: "AABB Certified",
      contact: "(787) 758-7979"
    },
    {
      name: "Fertility and Reproductive Medicine Center",
      location: "San Juan",
      services: ['eggs', 'sperm'],
      website: "fertilitypr.com",
      accreditation: "ASRM Certified",
      contact: "(787) 721-0680"
    }
  ],
  "Brazil": [
    {
      name: "Fundação Pró-Sangue",
      location: "São Paulo",
      services: ['blood'],
      website: "prosangue.sp.gov.br",
      accreditation: "ANVISA Certified",
      contact: "+55 11 4573 7800"
    },
    {
      name: "Huntington Centro de Medicina Reprodutiva",
      location: "São Paulo",
      services: ['eggs', 'sperm'],
      website: "huntington.com.br",
      accreditation: "ANVISA Licensed",
      contact: "+55 11 3094 6400"
    },
    {
      name: "Clínica Origen",
      location: "Rio de Janeiro",
      services: ['sperm', 'eggs'],
      website: "origen.com.br",
      accreditation: "CFM Certified",
      contact: "+55 21 3189 1800"
    },
    {
      name: "Hemorio",
      location: "Rio de Janeiro",
      services: ['blood'],
      website: "hemorio.rj.gov.br",
      accreditation: "ANVISA Approved",
      contact: "+55 21 2332 4000"
    }
  ],
  "Chile": [
    {
      name: "Red Cross Chile",
      location: "Santiago",
      services: ['blood'],
      website: "cruzroja.cl",
      accreditation: "MINSAL Certified",
      contact: "+56 2 2477 9400"
    },
    {
      name: "Clínica Las Condes",
      location: "Santiago",
      services: ['eggs', 'sperm'],
      website: "clinicalascondes.cl",
      accreditation: "MINSAL Licensed",
      contact: "+56 2 2210 4000"
    },
    {
      name: "CEDIMAT",
      location: "Santiago",
      services: ['sperm', 'eggs'],
      website: "cedimat.cl",
      accreditation: "MINSAL Approved",
      contact: "+56 2 2232 5555"
    }
  ],
  "Colombia": [
    {
      name: "Banco de Sangre Cruz Roja",
      location: "Bogotá",
      services: ['blood'],
      website: "cruzrojacolombiana.org",
      accreditation: "INVIMA Certified",
      contact: "+57 1 350 7070"
    },
    {
      name: "FERTILITY CENTER",
      location: "Bogotá",
      services: ['eggs', 'sperm'],
      website: "fertilitycenterbogota.com",
      accreditation: "INVIMA Licensed",
      contact: "+57 1 467 6000"
    },
    {
      name: "Profamilia",
      location: "Multiple Locations",
      services: ['sperm', 'eggs'],
      website: "profamilia.org.co",
      accreditation: "INVIMA Approved",
      contact: "+57 1 339 0900"
    }
  ],
  "Russia": [
    {
      name: "National Medical Research Center of Hematology",
      location: "Moscow",
      services: ['blood'],
      website: "blood.ru",
      accreditation: "Roszdravnadzor Certified",
      contact: "+7 495 612 4442"
    },
    {
      name: "Nova Clinic",
      location: "Moscow",
      services: ['eggs', 'sperm'],
      website: "nova-clinic.ru",
      accreditation: "Roszdravnadzor Licensed",
      contact: "+7 495 132 02 02"
    },
    {
      name: "AltraVita",
      location: "Moscow",
      services: ['sperm', 'eggs'],
      website: "altravita-ivf.ru",
      accreditation: "Ministry of Health Approved",
      contact: "+7 495 737 88 88"
    }
  ],
  "Japan": [
    {
      name: "Japanese Red Cross Society",
      location: "Nationwide",
      services: ['blood'],
      website: "jrc.or.jp",
      accreditation: "MHLW Certified",
      contact: "+81 3 3438 1311"
    },
    {
      name: "Kato Ladies Clinic",
      location: "Tokyo",
      services: ['eggs', 'sperm'],
      website: "towako.net",
      accreditation: "JISART Certified",
      contact: "+81 3 3463 1331"
    },
    {
      name: "Seijo Kinoshita Hospital",
      location: "Tokyo",
      services: ['sperm', 'eggs'],
      website: "kinoshita-hospital.or.jp",
      accreditation: "JISART Licensed",
      contact: "+81 3 3482 1181"
    }
  ],
  "South Africa": [
    {
      name: "South African National Blood Service",
      location: "Nationwide",
      services: ['blood'],
      website: "sanbs.org.za",
      accreditation: "SAHPRA Certified",
      contact: "+27 11 761 9000"
    },
    {
      name: "Medfem Fertility Clinic",
      location: "Johannesburg",
      services: ['eggs', 'sperm'],
      website: "medfem.co.za",
      accreditation: "HPCSA Licensed",
      contact: "+27 11 463 2244"
    },
    {
      name: "Fertility Clinic Cape Town",
      location: "Cape Town",
      services: ['sperm', 'eggs'],
      website: "fertilityclinic.co.za",
      accreditation: "HPCSA Approved",
      contact: "+27 21 423 0809"
    }
  ],
  "Spain": [
    {
      name: "Centro de Transfusión Madrid",
      location: "Madrid",
      services: ['blood'],
      website: "ctm.salud.madrid.org",
      accreditation: "AEMPS Certified",
      contact: "+34 91 426 9200"
    },
    {
      name: "IVI Fertility",
      location: "Multiple Locations",
      services: ['eggs', 'sperm'],
      website: "ivi.es",
      accreditation: "AEMPS Licensed",
      contact: "+34 96 390 30 00"
    },
    {
      name: "Ginemed",
      location: "Seville",
      services: ['sperm', 'eggs'],
      website: "ginemed.es",
      accreditation: "AEMPS Approved",
      contact: "+34 95 444 86 66"
    }
  ],
  "Italy": [
    {
      name: "Centro Nazionale Sangue",
      location: "Rome",
      services: ['blood'],
      website: "centronazionalesangue.it",
      accreditation: "AIFA Certified",
      contact: "+39 06 4990 2701"
    },
    {
      name: "Genera Life",
      location: "Rome",
      services: ['eggs', 'sperm'],
      website: "generalife.it",
      accreditation: "ISS Licensed",
      contact: "+39 06 659 8070"
    },
    {
      name: "FIVET Center",
      location: "Milan",
      services: ['sperm', 'eggs'],
      website: "fivet.it",
      accreditation: "ISS Approved",
      contact: "+39 02 781 8181"
    }
  ],
  "Morocco": [
    {
      name: "Centre National de Transfusion Sanguine",
      location: "Rabat",
      services: ['blood'],
      website: "sante.gov.ma",
      accreditation: "Ministry of Health Certified",
      contact: "+212 537 77 18 77"
    },
    {
      name: "Clinique Averroes",
      location: "Casablanca",
      services: ['eggs', 'sperm'],
      website: "averroes.ma",
      accreditation: "Ministry of Health Licensed",
      contact: "+212 522 48 38 38"
    }
  ],
  "UAE": [
    {
      name: "Emirates Blood Bank",
      location: "Dubai",
      services: ['blood'],
      website: "dha.gov.ae",
      accreditation: "DHA Certified",
      contact: "+971 4 219 1999"
    },
    {
      name: "Fakih IVF",
      location: "Dubai",
      services: ['eggs', 'sperm'],
      website: "fakihivf.com",
      accreditation: "DHA Licensed",
      contact: "+971 4 378 6666"
    },
    {
      name: "Conceive Fertility Center",
      location: "Dubai",
      services: ['sperm', 'eggs'],
      website: "conceiveuae.com",
      accreditation: "DHA Approved",
      contact: "+971 4 379 8748"
    }
  ],
  "South Korea": [
    {
      name: "Korean Red Cross",
      location: "Nationwide",
      services: ['blood'],
      website: "redcross.or.kr",
      accreditation: "KFDA Certified",
      contact: "+82 2 3705 3705"
    },
    {
      name: "CHA Fertility Center",
      location: "Seoul",
      services: ['eggs', 'sperm'],
      website: "fertility.chamc.co.kr",
      accreditation: "KFDA Licensed",
      contact: "+82 2 3468 3000"
    },
    {
      name: "Seoul National University Hospital",
      location: "Seoul",
      services: ['sperm', 'eggs'],
      website: "snuh.org",
      accreditation: "KFDA Approved",
      contact: "+82 2 2072 2114"
    }
  ]
};