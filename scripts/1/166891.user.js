// ==UserScript==
// @name       WBB Host Tag to Host Icon Replacer
// @namespace  http://www.warez-bb.org/
// @version    0.2.2
// @description  enter something useful
// @match      http://www.warez-bb.org/viewforum.php?f=*
// @copyright  2013+, You
// ==/UserScript==

var spans = document.getElementsByTagName("div");
var fixed = "";
var hostIcons = [ 
	[/\sbitshare.com/gi," <img alt='bitshare.com' title='bitshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVQ4jcWTvUtCYRTGf5pfRfSFRYPlkARFQUN5W1oSpxoaIqhdmsOxwEkc2/oDggjXoMWhhj4wiCJr0LCMijJNDA21NG+DXrnalQKHznae5z3PeZ/znlcliiKNhLqhakAjTyZXT8aALWAQKP5St+d3C3ZNDeEBhv/Y/A5+WrDWO70yY6a3QyelOeBSuoo8igB6rRqHzcTUUCdmo6FCzk30sOF7wHscfQeulQQAcM0PYLW047t4ZfvwGQCHzcTuWZyd0zjAIxBWFDAbDUyPdOHcDHEUeqvgB8EkiXReSq+AmNIM0GtL0FPyowqXFQOEgIyiQCSWJZHOs2zvo1nXpOQQIOh3CwUlC+r8l8iaN4xn0cK+a7yKLNv6pDxAJYEiwHkkxcJ6gNH+VrrbKk/HzUsG4B6I1hPwAUsAqWyhaoiyuAVS9QSclJZktszVrnMLEPC7hZwEqP79N34DgzVr7+IuGXIAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\simdb.com/gi, " <img alt='imdb.com' title='imdb.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADU0lEQVRoge1YzWsTQRT/ddNII+k23VKwFvpBEQUpraCCFaQoRMXeBOnFD/AoivQvULx7qCcPhYooIoJ4UFQK9qagCCIIsTRpa1U85KNpQZttZjxst9nZN5Os9ZDO0gdz2LdvXt57v/ebN9mGd48THBpLI+fA3oG2esexKUl9yjoJcE0x4HwdAc7qHcrmxEmAaZwAQwhaiHGAaYoA42FAABpzAKHggPbHKDRGANunUJ0lHJM4dC1UKDKcu7K48XzkQAw3x9rxcnoFtydyggP3HQAkzy+QH3h9v0uqB4CR43GcOdGMvq4oABD/Y5ctnBqOV01AOsiyuTLSC7ZgxBmQSpcEPQAs/lzDjevtWC1x8g5w9sn0ADA+mcf4ZB5XL7bi2iWL+E+lSzh5rGr8AAMMFwHvkmUqk5LNwbmTiEyCHA537uWVdpwDs/M2CkVGYnQXGWTSBJg6mNl5G8/fLMsDkHArNdWH/tNplOyKw9l5m/h/+/E37j6s2JnNBt4/7SUJGgiKgCKBr+lVZL7J20Tlq3NXY03/Hz7/EZIsLjM8eLYkxskBwz2FvEv07uj8wZhxw0kgU8KXmVVB54rsdGOMBivzPzpiYnTEFHTZfFmMlUs4IKs051TdlogAAF5MryCzaAs67z6ZL6qk/q1EBJbfH2i3GO4g8y6ySVK1wwMxAMD3X2tEt7FXggBnNFiZf8iKyWmsmyax1eJUx9unrq5WAkQn4Z4KPX+s6y3EhSXuct4TBPrFaptxg9gQX5D7kumUCAixrt+FvGRTEc8fS8IUq221RIiNksQB/KsQ8O6Xf5UISOKezqjwfKg/Rgv2HyRWmAn7/2mQEdh9lbRaIjVtXF1uqSzqFO0iy0DBAfUgq6bv3l1BIXk0HqgNhi/MobgiZtZq0vbLFsrIFmiita8SqpOjRnWD2AAgwQNA8056ADx5VSR2B/fHKAL+KRyUZIwByaHKdberIxqIxF4Z3NeEqYkeqf+zSRM7og0bz8mhOAb3NZFYGx7dSvDePVb1X6qjzP2wYZkRck0BgMxMbuv/J+7ucHimOtH0/y7kHw46SQWBLdxC1SQcn1X0RyAMJNYbAcX01UGk/8h0kpC00DYC9RPOgUbVFVoHYS6J5zK52tZbVP4C4yj5TzIOcLYAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\sextabit.com/gi," <img alt='bitshare.com' title='bitshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACm0lEQVQ4jW2TvYtdVRTFf+fcc+69896DGXyTAVHyJRaxsrBTsfEPkBRWVmJjbaH4D5hCiYVpQrAUIUU6FbEQFEElGlIELTSTyBjz8Rxf5t17vs+2eMko6Go2bFhrw1p7qdPvviC9UXRG07dCpwwTq7EGOqPoDHSNpjWKzii0VrRaYRtFo8G4VJkemWGMom01k0bTtoreKjbMeu4Pd9mZbbI1nWIN9A8E7+wNmJCFwVfoNVChBaIG4M/lHr6ueOboi/xy9yqr6Hh8aw4iAKQiGBeELlYAaqsA8PI7af8vntg5xRvPnQPg+pFrXLz8HtuzR9aH0PhcMSEKPsnhUuVbtHrJO6c/5t84sf0U27MnuXJjl6ePHQcqIQs6OkW8HzhYCtXfwdbyH/JDvPrsW/x2e58rN3YZYyVmQXtfGIJBcuDRjS3OvHzhf8kP8f4rH/Hz7oIhVUKpGDdE+r5hzIrFcsnr51/jzZfe5vjOSQByyXzw6Vl++PXyochjO3N8ElwSTIwJ71tS1lzzG8ynfxySAS58/iFX965z9NgpugextlYxOsUYQEssuCESfML7gveKXDIA95YLPvnuS9rJnJWvjL7ikxCTcBAzY6qYFAsqpnWuoTAqwTQGgC9+/BppNolOUKlSO0UpEDpFlxTZVUyJhZgLAFaBc5p7ywXbm3N2b90mJc14UEidxmZFMsIkKUqvSU7QAJKE4DIxFEbf89PNmwCshoR3whgz3mVSFPxYGYPgDypjVGhSPTQsFiGGwmfffgPApa++B2BwGecr3mVcqPixElaJ1TKgZs+flGZqAZBm3YFWCqkqbNswm0/peos1ig1r1o00ikmjERcwAGVI/3yK1XigaRtiEVaLgdg1TKzFA7NubXCwmrbR/A0pOmLvfax+rQAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\sul.to/gi," <img alt='ul.to' title='ul.to' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVQ4jW2TTWhcZRSGn+/v3rl3OpNEJ62TauJPm2AKpaiUgkqSVsG4qdSlIFgsom4kKxeSMN10J25UdNGAVK2iCzei1lpjrGiVVMRNMbZRaqtxmnQymZk7997v+1wMCoqLZ/dyzgPnvHjv+S9MnJCl6ZM3fHrul0NMnIj/L/M3wnvPgdqV2R1bRa2ZwFrLYq3j4D0Be24v8vbiBhdXJdZDXywoR7D8h59bqFWPAqgv9TOzxuhax8VYGSGlZuJOxZH9RaSEs8uGVJbQYUTqC1xvK/B+6viZTf/EZHFBjlbDWhCEaK3AW+69I+fIVIRWkgtXHPWWxhiFVqKH1igTMloNawC6mSqUknhn2TuScngyJA4lp37MeOc7QSEK8Aigl3FS4LTieuIBkI0O4B07B1OenAzZUlCc+znj/SXQKkApiZSgBCgpENIjBKy36Q0QQKWY8tSUoViQfL+SMr+Y01eAu27JGOnrkGddwIH0SCEQAoQQAGjnHbuqnhtLknrT8tbXOWNVxbMPRhQLEiEEn/yQcHwxRagARE/dO9czcNaxe1hglOCn3y2NtuCRuw1xKBCix0N7Yqp9FussNstJuwmx7vLAzKlbdTn29McSgE7qiAIIdE/P+942gFBDnuZoEl5+PGawHGHtvjNyfVNwea2nEwWCay3Pyp/2X9/227WMS6uWQHapPRozMqgpGPjwm6vHtBeSr5Yt9405xrdrKsUub5zNcS5huKJoJp75hQQtLDMPx4wNGdpdy/NvNnjt5Lfv6oFYsPSr4vxKxr6dIU/vN7z6WcpLHztKkaPdhW1bPDPTEbuHDY1WTu29Jh1rADZ0KYK1luaV012GBjJ23GR44aBkaSWjviGp9kvGbzZs69esb+Yc+6BFywZUygr/+WNO771NUSkp1jYFL36UcPh+z2jVcGBX+M+tc+u5XE95/XSCUIbx7YZLdTEH9No4/0U6KxE16yydJGMgytha9gwNKLqZ5+Kq4+qGwhhDYBSNNnPPTReOAvwFGlxcI7Pqh8AAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\suploaded.net/gi," <img alt='uploaded.net' title='uploaded.net' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVQ4jW2TTWhcZRSGn+/v3rl3OpNEJ62TauJPm2AKpaiUgkqSVsG4qdSlIFgsom4kKxeSMN10J25UdNGAVK2iCzei1lpjrGiVVMRNMbZRaqtxmnQymZk7997v+1wMCoqLZ/dyzgPnvHjv+S9MnJCl6ZM3fHrul0NMnIj/L/M3wnvPgdqV2R1bRa2ZwFrLYq3j4D0Be24v8vbiBhdXJdZDXywoR7D8h59bqFWPAqgv9TOzxuhax8VYGSGlZuJOxZH9RaSEs8uGVJbQYUTqC1xvK/B+6viZTf/EZHFBjlbDWhCEaK3AW+69I+fIVIRWkgtXHPWWxhiFVqKH1igTMloNawC6mSqUknhn2TuScngyJA4lp37MeOc7QSEK8Aigl3FS4LTieuIBkI0O4B07B1OenAzZUlCc+znj/SXQKkApiZSgBCgpENIjBKy36Q0QQKWY8tSUoViQfL+SMr+Y01eAu27JGOnrkGddwIH0SCEQAoQQAGjnHbuqnhtLknrT8tbXOWNVxbMPRhQLEiEEn/yQcHwxRagARE/dO9czcNaxe1hglOCn3y2NtuCRuw1xKBCix0N7Yqp9FussNstJuwmx7vLAzKlbdTn29McSgE7qiAIIdE/P+942gFBDnuZoEl5+PGawHGHtvjNyfVNwea2nEwWCay3Pyp/2X9/227WMS6uWQHapPRozMqgpGPjwm6vHtBeSr5Yt9405xrdrKsUub5zNcS5huKJoJp75hQQtLDMPx4wNGdpdy/NvNnjt5Lfv6oFYsPSr4vxKxr6dIU/vN7z6WcpLHztKkaPdhW1bPDPTEbuHDY1WTu29Jh1rADZ0KYK1luaV012GBjJ23GR44aBkaSWjviGp9kvGbzZs69esb+Yc+6BFywZUygr/+WNO771NUSkp1jYFL36UcPh+z2jVcGBX+M+tc+u5XE95/XSCUIbx7YZLdTEH9No4/0U6KxE16yydJGMgytha9gwNKLqZ5+Kq4+qGwhhDYBSNNnPPTReOAvwFGlxcI7Pqh8AAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\sputlocker.com/gi," <img alt='putlocker.com' title=sputlocker.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4jb2SwQ3AIAwDL4gFGJKlmh3LCPRXUSgBilR/IWfLiXCcmQ15gBzDp2HRhNtxB+YAomkPYEH8iptoavpy5SOMC60NbkCOAdFkJniDPBLMrrP81yRYGYaqxF4Cq5/pNfbgUwCrm39O2ZIH+/pGugDjJSnFXqF8uQAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\syoutube.com/gi," <img alt='youtube.com' title='youtube.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jcWTPUsDQRCGn9ts4okf4GFhEYJGBJVgYSP+gTRiI2oh+CcsbCUgiCiI+IEW/g0TgjYRxUYrURCrYKmxSDiPzd6tTZDLJSiSwoGXnZ15552B3bGMMXRioqNqwLp1emzgDBgHMkDil5oHQAGPM++1VakNG8DKH5pmGuf0tdP7KjQmqzGE4SfijB6eEE+nieYiyIo6pOpAGL5t4ywuM3VRYmBhiWg+hJRQBkcZCOMzAM/zUEIwsnfA8O4+ussmylMGR6q2L2FwXff71jc3T9L3eVlfixKFrLf5ByZoFvgolykdH5Fsw5UKAiJTGAye5wHwVMhztbXJhPJQlhWtD6QyVIDBJgEd4FarXO5s85Y/JyMFMSxU6wAV67S/+w6YDkd94EZpxmSMIdHSNWz3UmOKUQGA2UQMAM2Pu1KU2pADksBkI9giFrJnoNbwC0DO+vdt/ALF8abcQVjhogAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\srapidgator.net/gi," <img alt='rapidgator.net' title='rapidgator.net' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jW2SIYgbURCGvz2eGLHiiYgVV1gRseIKK1IaU7oyphBqevLgTOSJijOFyMhCTUxlIXILFREV5xpRERloCisiFhrxRMWIhVfxctnbNGPmzXsz//zzv4m89/z+8cVPpzPqv4I2IKKoCmI4G1tRxv2a289/osh7z6uXL/x1plxn4BqonAAKQBJDInTsYSeUWyguK6L3b/s+jYXJAMqNMPvZTZ5cwU2unNpyK8xWcLHeC9cZPFRtcWZh2INhAvaxe9P1o34ANTSBbrkND+M+3A8cEPTY7GG963bPegQ9AKNNCMABllESipdVoPg/eZgXSp6AAEZEoQFt7DFhs4fpKpxv+g6R8FZuodYgNCiKYFQFcAit1KtajsWTHDAOGljXQq2CJTQV4CLM0n5bgArnWqUr4Im1GqB8LAIqBtQKiy0sd0L1XbBGucuDRk/tyIBGO9dilHmhjC6VjYPVXsJymSdpjbYMOjQPYIko04EyzRWMsN4Lq/rQwrQMTBIrtUIan59z+C3txPe5I4sPewKYrOcoK8vdlTsP0GvHG6dKkTgwwmIjJKJE3nvevH7uiwTGqSONz61Oa64RFluhrCzz2SQAAHx498yva4vTQO3xY0+9NZD1HJ++/ooA/gENrtYV6ch1MgAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\srapidshare.com/gi," <img alt='rapidshare.com' title='rapidshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACh0lEQVQ4jXWSy2tTQRTGf+dmbh5gTWsfNlaTVopgFa0W3FSwGBUXoqg7EUQXLt258V9w51bQnQiiCxERfCGhVBHBhY8SG61eUjUBtZFK7p2ZOy5i4oP6wSzO4fA78x0+cc7xS84YgzEGay2e56GUQimFiLCMBEABOOectZY3bwMuXbvHbCWgf1WWyYkxipNbGcr1o5T6F+BERMQY45xz1OpfuHD5Js+el9HiCENDpDW5gVUcO7iLA8UdpNMpGt+X6Ole+fsbURQ5ay2lx8/4vrSE1h7Xb89QqX4m0oYo0kTacOzQFGsHe8kPDbBn5zY8zwNAWWux1vJjcYF8bg1jm7cxNlrgyq0SN+5MtyDacPHqHUSE8+dOEccx7dt51loAtPV4FyzQaDRYP7KGs6ePcObkQXqyK9DGYIzF2Jik7xPHMe3FXpuWz+f58q1B5d0czjl8P8GJo0U2jq7DGIs2lmYzJAwjnHPEcUwcxy0LIsJIYZjXs7O8eDVLbvUgfX0DfK59ZTSf4/jh3a1hlWDDyBDW2o4FqdfrDkApxcKnj9y9/4Ce7m72FYukUqnOsdqy1hLHcaf22l7CMGTd0Fq2j4/zqVbjYekRWmuMMTSbzc7TWnf8W2uRarXaiaKIkE6nefHqJaXpaQZXD7J/715SqRRhGC6XRiQIAvdXQ4RMJsP7Dx8ozUyTEI/dU1P09/UThiF/RL81Pz8//3fnlzKZDJHWPHn6hCAIGN+ylYntEzQaDYwxvwGVSmVZAIDv+2SzWaoLVcrlMl5CGNu4iaSfRGvdAjjnmJub+y9EREgmk3R1dbG4+I1avU5fby+el6BQKIi0PZXL5f9C2iClFL7vY4xheHhYAH4CRmpaPpbuyeAAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\skeeplinks.me/gi," <img alt='keeplinks.me' title='keeplinks.me' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABH0lEQVQ4jZ2QMaqDUBBF50kEi0fAViwskjq2ARurYG1nY2cjFpItuAAXENK6CrFzE/YWYhExgo3e3/yQHzTmx4FXvOHOYeYQ57wlIqx5v7PPhiiK0HUdsiy/BLfbLXRdh6qqc6DnR1VVAIDjOC/QLMtQ1zX2+/0EsKEPFccxHY9HOp1OVBTFbObtBp7nYRgGuK675GIeYBgG+r5HFEWfZE4B5/MZZVkiTVMwxr4HNE2Dqqpwu92gadoiQJiTkuc5HQ4H6vueLpcLMcYWRb+VaNs2xnGE7/vfS3z0kiRB27bY7Xb/P+FvBUFAXdfR9XolQZjGPwLquibf98kwDArDcNmBJEmwLAuKokxWNU0TpmlO+uwhYm0JnPP72mHO+f0HHyQG0vZOFYMAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\sbillionuploads.com/gi," <img alt='billionuploads.com' title='billionuploads.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApUlEQVQ4jZ2SwRGDMAwE9xiayKSI0EL+qYSCaCT50wJNMJShfJCHGCMc7iVb1so6W2YGQIdswkSm2/1p+R7AMo8CaErJGjlYD8MAJkwdSnEtoJkwebHHUUGuv0ZwyBYmN7G2eKtlHtV+pEPCy469qHqFCJ5MzDtGXUuQtvawXzmX3nDuwbCO0u/Xl3+iK/QgMrEIuKIfE087Dvt8eIM0Tl942nXvCwJ7UssIBZlIAAAAAElFTkSuQmCC' height=16 width=16> "],
	[/\s180upload.com/gi," <img alt='180upload.com' title='180upload.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADD0lEQVQ4jW2T3WtbBRjGf+crOSfN59osJuckbXBN58StYa6KV4KjDr+2ioUxGMrY7SbDUTekMJioQ73wQnBWLIJ/gMPihbKhTLyY23Ayx9KOrh9rsqbNV9OTnJx8HC+CYxu+V+8DLw/P8/I8AuDw2OgxHVmRabVaOI6DLMu0221WVlYeP0V8GEQiWxka2k6pXGYzt4pRrRGr1tjIrhIKhHh/YoJoNPoIgfzfkkgkqNctQrlVTsYHEIABxQ2AkIwTfOlFpmZ+QpZkYrEY2WwWAAk4E9kaodlsEalbvGvESchugpKM5NHY8clZFBFCySQ7BYnqjZtcr5kEAgFM0+xaCIZCWKUy7xkJFE1DP/gmxqFxZG8PW54bYf3SZUJ79mDO3WEs1MuIIOHz+bvqdF13SqUKH/YPsMvrQ39rP97UIN7UU9yfmSEwvItmsUT1doYtLzzPPydPs9ZqcnjuNoahI6qqSrjT4dV33mbbiWNY93KAyML5KYyD4yx8NUX0wBuUr1wl+OxuNCNGWFJ40uVGFMWuhWQwgD+9k8i+lzHn7+JNpVACfpobGzTW1sn/cpHIa68wd+5TouNj3ae7VQRBQHSAymaNWxOTlK9eJ7JvlNmPztF/9Agdy+aZLz7j/oUfCe5OU7n2F7GxMeSAD0UQAAERB+atGgXbYunb7+g/egQ7v0ZtcZHM2Y+RPT2Imoogy0QPvI69to7/6R3MW3UQQFJV9Uyt1eZubZPhuk1PuA9JcyG53KhGlMJvl0l9cIpbpyYJj+6l+PsfXPvhAt8XC3g8GgLgDA6mcGdzfJ7chtbXR3r6PH8fO8HQ5GlwoHTlTxa/ngagA0ws3KGuR8lkMt0giaJAVVaYrZQYkV08MboXHIelb6apZmbJX/yVWrOBJAh8mVvhhuDQbNqYptlVAKDrOpZl4zdNjqfTDIsy+UIRVZJoOg6XKkV+LhYpqCpen4flpeVukB5uY29vL33hMMtL95AaDWKqG7vTIW/btBUX8bhBpVImn88/KNMjBA/qrOuomtYFDjg4NCzrf+v8L3QBI2aXsTrcAAAAAElFTkSuQmCC' height=16 width=16> "],
	[/\slumfile.com/gi," <img alt='lumfile.com' title='lumfile.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE/klEQVRoge2XTaxdVRXHf2vvc849977X957l8dqSfiBgQ6CkjUgHJQEFRR1AbMLAYLCS6ECNA0zEOGBAGBhpTIwBBkBCwoAPFSUOjCUmGlI6MKSJfAj1VRFS2sfte7f389xzzt7nLAfntjL09vl60+T+k5W9R+es31r/tXe2qCqXs8ykE1ivpgCT1hRg0poCTFpTgElrCjBpTQEmrcseIPh/fOS+d04uvhctfN1104VuJz92/eqZN/ema63HvnlPqaqBiCwAEVBSFe2Tawq0L/bfst73wM//cCR65sb9j5ywcw+ZfmlqnbS5qZ282mh3j+x1a0df+trVB/LmW3dTDucQ7zGFQZzHlBEm97a+vR1v/tKzIvLaCGgsrbsDby1eted0rXFPkFlj1SDh7FISN+5LGnNfiRZ2/Gv4tyeuzk7+amlmaREb5WgwBJtClKBhitbqOHt4dzj/1e+LyPFx/7+uGfjOC7+Oj27ZcTDX8Logh8BJFYU1n6rVF7+1tbW/95dHl2aTf9CQHjWTEMuQ2A6omz5126MuyzB4bl/hB3dcTD7rAljefdP2gZgvqjeR9WCdYj0YBztqypaPj2KGHSIdIC4FQgSLaIhqgGiAECKlN6ouUtVLC5DEMwcGwey+qvpgvWAdGA/bQmGm9S6RgCkdDFuIRFSutQgBqK0CiyBGRMbO4aIBHnzyqag1u/AD700c5GBHEIGvYq4skXOnCEZnjQ5OQ6noqPpoUO3LEEqfKOVpwF8ygPf37r+tGc3uC/PKNlVUe5+BTx2kHQwgCpIP0bQDEgJBZSGqUDWGqjVj5zP2KfTdN47vfHt+6d73P339/eIkCDxYdx5AKHI4N4BixqNZgkB1OJZAsgIz80CAYC9YSAgjYHbcXMYG+MXrx+I/7r7x5Y/iuc/FAyHKweSKdYL14DKl1ROKFBpGseh/k1eQYQtcAjaCkY3QEJSc6jIb+x4Yq2VvzM59vjmz6bP1TAhzxTgIvBAUisvg3EBwmaI5JEOhLM0FAC0Bn0LaQrHAaA4IQInQYpGLcMT/DHD4t79rHN++637jjQkcF6puPZROWBtAngFOwEHpLYQNtKgARIGiQIerSFkCVfKiEdYtRwz+fKjw/bs2DODUlVu3nrXRnjAFOxrcwIHPlLO9anDJtYpM8c6itQVKP6r+eZC0BVkbJEJGFpLirJG1R24ok2OPbhjAYjzfnFtrv2p6w37le0UddIaCyxVyIJdqTQu6XU9Z30LhAQXVaqUo0eFZYHQaESBEGO1D0b5mwwAevuWG/nX//udPr1w5/cD8mY9eMd1B0k2UYaoXbFOFQDKkudJplfM7+7mDsgA5PwsKkq5WdwLBqAujYcZs7E185M4DrXdvvfY3J27bcfCu5ddvbny4/Muw3Xlb+mmftIS0hMEQ6a2urK188JNrb7n9T3ljM3kKWoysVILmKZp3gBBVO4qAaqI2EOCTeubQl987mL3zo32rx78x3z718KZe8zXbXVu1neaHC3R+tph+8GK85TNPxwe+1+8F20h8TFbUyHyNzNXIUk9exOQ+Jnd1nNkDdttfx81j3e8BgB8//nzw++aunWeShauKfprevbv79+d/+IUEiNLmyW/75olD4ttLYrUqmVFobDYS1gPEl5jS2/iKN21912EbLR295ACT1GX/Jp4CTFpTgElrCjBpTQEmrSnApDUFmLQue4D/AJrjbLf2z7NaAAAAAElFTkSuQmCC' height=16 width=16> "],
	[/\sfreakshare.com/gi," <img alt='freakshare.com' title='freakshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACd0lEQVQ4jaVT70sTcRh/7vY9nWun4tQ7JcTmdqsG415UL8pNAj11FhpFLyIQobcROKL+gYiKehG9UIrCF74wGNaoFymIxGKUbieyRjg7riC9zLntPG0/zvv2pqJs2gsf+Lz7fB4+z+d5HgJjDHspck9qAED/I6gfk46VUGhAi88fq2xrC9afbH9RwTYsmSjKAAAg/hyhUCiUpdPpZpvNtogQMj6MPL6kDA/dqMZUvYkgwQBsFKv2LZndh8JV7R2jTKtvisAYQyaTYaPR6MWZmZkrmqbVMgwT43l+pJFl320tf6n5OjnRo70J++nMhp0uq0AWcwWZ0tKG+WzvbSIajfpDodDdbDbL6bpOGoYBCCGgKMqgaXqVZdkpt9s93lRXG8+8jx9efvTwWuPaxpHVjWzB/uB+B1EsFslUKrU/Eomcm5ubO6MoCm8YhoWiKBIAgKIoIAjCoGl6PjA42DF1umuysJDkkcsV63n5yosQQgbDMJ/7+vruCYIwJEmSJxKJ9IqieF7X9eafmyKtVutC7pPcuJ5IeCjSBA2d3c/NNL0JGOOSkCTJIQjCN5/Ph71e79b09HTX6+tX74zWVuMntqriSnLBjjHe+Q5mZ2ePy7JcoygK5HI5xeNyxZYmJk4VTKZcdWf3szqHU9r1DsbGxgYwxiQAgCAIT9XFpAM7HPGjN29dPnCiNfybWMq+LMtNTqczz3Ec5jjuezgcbl1fW6vUVNWynVvSQTAYvAAAZRhjsNvt8x6PJ2al6c2SVrd3VFXV4vf737a0tBT7+/vHRVHkdwoaY/xvA1EU+UAgMJxIJA7uJvyFv34BACCfz6Py8nJ9p3C31w8g1YDZS7SSeQAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\sfilefactory.com/gi," <img alt='sfilefactory.com' title='sfilefactory.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVQ4ja2TsUtbcRSFvxd/b6gaiRJQBzWDW2gQssTlER8tUrsEh7i4+Re4uDhmC0QkxaEQXHTNEHBSfBELCg4OxYJL02gg0EUjDRJN8k6H0tK0k7XffO+5cM85liTxDALPWf4vAuYpw7lcDs/zkITv+6ysrPwtcHJyQi6XQxK2bWPbNpZlUavVsG2beDzO4OAgNzc3pNNprN+fuLu7y+rqKq7rEolE8H2fRqNBt9slHA6TzWZ/HarVajiOg7W1taWdnR0cx6FYLFIoFEgmk1xfX5PP5/l0cYExhm63y5dqFc/zGB8fJ5VKMTo6igVoe3uby8tLyuUyZ2dnlEolUqkU4YkJ4q9f0fLFY7tNdGSE95ubSGJ6eppSqYSZmZlhYWGBer3O/Pw8AIuLi7x0XT4eHsKHY6h/heY3WFqCQIBCoUAwGCQWi8HGxoai0ahc11Wz2VTZ8wRoL/9OevNWnweCqoCqLwbkX11Jkubm5rS2tiZJot1uC1AikZAkOcmkhvr7pf0D6fxcf9JqtRQKhVStViVJxhhDIpFgeXmZu7s7jo+OiExO4g0Fub2/xzrYh0AffRZ0bhtkMhnS6TRTU1MAP2ysVCqMjY1xenrK+vo6oeFhWg8PdB4f+emy7/sYY5idne2xsycHnU4HY54Uzl6Bf+HZZfoOpeULKY5tIfkAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\supshared.com/gi," <img alt='upshared.com' title='upshared.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVQ4jaWTXQ6AIAyDV+Kd8Qh66vogfxslktgng+23BidI2h8d6hCApJLE5B0buGAOjLtnR1Br0MIlyCtMMjYQAFZIcq44VSl40lR9UzXTG+xMV95yibTMbVkm3yj9HeDcqB486cvw9a4Dhu+sjO5s8CazxYad+rmqZtomxkVaqkyfAA6iQItVdgAJErWd9+/v/ACUIH0CXFttPAAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\sfileswap.com/gi," <img alt='fileswap.com' title='fileswap.com' src='data:image/png;base64,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' height=16 width=16> "],
	[/\scloudzer.net/gi," <img alt='cloudzer.net' title='cloudzer.net' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9klEQVQ4jZWSPWgUQRTHfzuze18xwVwu6JFYeRIiBE8PFUQFEVFR1FqwUbBSUQNiaSE2lmJhp3U6mzQ2gVSBiEQUReE0nJpAzgun4XZ2d2Ys9j5cDwwZeMXw3u///u/NON+OYcV2ENvY0jG/wayDK7LgjoEc7i+SxTLuWAXdqGLWlzH1z92cbkCkwBUeyAEQQz0wVb5O5vhDnNxoQjCqzeO/uo1eWYQAjAfCKDAB2DCOzMknZM8864MB3PGj5C7NYCOJCcAocAmAAFCQ2neZ9MEb7SE1/vxjdHUuhicvkK5cozV7D3xNh3N+HMF6EyBHYPDuErI4BcDG84uE714mHIhCCbMW70HXIfwILlHc3RH5Lqy/vyVcTMIAptZbIgqIOgIBiMzOXuHaMvj9r5I4wd8CCmz9ZzcnR0ubC7QdCBuBVaBXV+LOgChO4B26gvVJhCjsBTcf3xXYCOSdPA9kDhwJOAJv/2kAUpVzgIdp1BHDu0ifuMrArRfI4iTB3AymBVETnNpubGpH/JkQksFHs3gHTv3XffPmYdTrBYLVzghB21JL05w+y8bTaaxq9YH6y3t+3T9PuLQQMxE4X8ex6RGQ2WSxk84i95RxS1OgNdGHRaJPb3piLVB1cKoFbGoIZGaTrf/rxoegCW7YAmNAelsUCEEr+AN+E9MwRnCIMAAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\sultramegabit.com/gi," <img alt='ultramegabit.com' title='ultramegabit.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzUlEQVQ4jU2TzU9cZRTGf+973/lkGIZCYVoiVAKklpbYYqnRjTFqdOemblz4F7jwDzHu3eufYEz8SNRoF3ZhY9MSAg0i4AwMw3C5dz7uve85Li5EcxbP5jznOSfPeYyq8v7dTzaw5nNjzBrG1A1gjAFAVVEAUbwIKrqPys+q8un3f37dNe+uffwW2O+wxllrcqIxGMiJF2RFES+I5qiiewZ/J7hx9c4PGDNlAC5Uo2zA6dQY4ZUGO6tL9Mcc5bM+ZD4fpoqoTKCUnIguWhSxuZIULN3ll+k8/IBYJiAJKP+9yV/FLYrHHaYPjigOFVTxXt5xKoogRElGuLBA4aUpwuUlenYW74E+9Jq3mFxfIuvGRF9+RWP/BBFFRatOREgzoX31BvrhR7hpS80FpN7TEYHxgLAbcD2pYMMKba5Rl2PEKyA4EaFrLfHaGwRpkSARbKNMCaU6gNJxRnNHmEksB2dFKC3j/R+oCiqKE68c1ecY7cUUgjbVN69zLoZBzXC3I6x8c85KlNKM4ff5Bntvz9N+Jrm9ojhRT+RXkFaBtDAkO0wZXSlQHUDz1x71x23sXMD8dkoh6hPdn+DQC2juhqsFGWU/IBq/j4wKZAdlJm/P8uC4z+vbHeoz4yxcqzB/GjK7ucuTWpndIEVRVHXoxHsW+484sQk3WWfueUC9vcdrcUL1fEg46eif93kRtRmdPcb8dIiIRzX/UudFaEhINfyNm+kL3ktWaR86nAHGKhxFhkdn28ym/3Cv0MOGByQyhahHEJx4AcD5Ac+zXUo+pllZ5GkSQzeiHtRoDfbZSlpo0WJMiUEWX57Qd4lPnoHeUpShKk/iFiYo0RqdczI64ZXSBE5HnI4inophITCMfHKZlG/NqzMPNlT1F0WKefIU0QubuMSLUv4fsS0w60ZVWZ2+d1tVvlBkQ1TrebNcron+RwLYBX40mM92epvhv8MVvby1wgMVAAAAAElFTkSuQmCC' height=16 width=16> "],
	[/\smediafire.com/gi," <img alt='mediafire.com' title='mediafire.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACb0lEQVQ4jaVTX0hTcRT+7m/bveveO3e3NTErUZMUCVpFvbXEGlRbFthLQj4F9RAFRVHUcwkFFvRgBAWRQuFDWkllSi4jyAYrFf80p6TlzDu9OnXX3evv9iBOSnwIPzhP55yP853zHcYwDKwFZE3dAMyrJV697zvc+Pnn0d5xtWhGM0TJalIKnGykbM/GBn9JYdNSHfOvhOaPkQOXn/bcCqcED+x2WDgOhBBQSqHNzwOKAi8/G6y/XlrudolymqC7e7j4xv0P117+0ALTm/IyhKws8DwPQpZVUkqhaRoUWYZXHw22VZftWzHB4Oh0zp3WkYs1/cY5SZLAsmyahFIKXdehqiqUaBRNFZsPmQEgPjnrrHoSulrTET8zY7WJcDhgs9shsgSVHh6V29Yhz04wPmfg9OsptA8tAJKEptAvv7mlvb/02N1Qw0xmtmjK2QKrxYIT2yXszxdxpFBABrcswc0zOL/Lipa+OLCwgN5hpcj0vMMRTjCsDckkjLk56JQiPKaib0JHjoNDsZv7S2LXWBKPO8ZgTE1hqzHdn95BIpEUWz9FS049/PZIFpzrwfMAx+H4DjduHsxGgYtDLKEh8KAHocgEEIvhbCG5xxiGgXh80hkMfvV+6ZrcXdU8coVmbSCwWgGTCSAEYBjAMBZD1wFVBQYG8LbK5zMDgMvlmEilkmzjs/YyqgkEDAEEAbBYFpsZZumOgKYBsgyvPRX0+Xa+W3HG2to3Fber2y6FY6oHkoT0JJQCqdSikXK5YH39hXK32ymvIFhCZ+f34rq6tpORiFIQHYznZ7ptv3NzbUOBgOeF3793dSv/L9b8jX8APEgN1vjux5wAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\s[^\.]+\.?zippyshare.com/gi," <img alt='zippyshare.com' title='zippyshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAADq0lEQVQ4TzWTW0wcdRTG/9H4oCbGmPhgYmJiTWqiJiZ9ML4YY2r0oU/WJ03beKtWUAIVlLZJqdDSAjYgdAEpIEiBpnLHyEVpYZddYNhLYS+wV2AXWNidYXZ35j8zO5fPKYlf8uU8nd85OReiyplnc6yvKMcxVbLguafk5pcMdf2UrmVIho8TLr3+WJZbeVyme89JEnuECpuvqvn0k6oqERgqIZn95Uo1NwaI4zCEYcC0IYzIqmCzUvZfB2X/dsvcmEdiRxJSeiAvpe8ZfPpBBRUi7wEKIRI35UVuEHrGND8A/eBP6NxdyMlO0OTvEHc7ICRaICaaQON1oBsVkDauQub6x/JqiBCZm7Hlk91Qtv+AFO+CuNmFXKwbmVgz8rGfYESLoIe/gRo6CyX4FZT1LyBvVkKji+cNI00ITdkHssFWZCJtyEYbkYv8AjFSCTV6AcnIdQTD9YiHaiAGLwLB76D7P4cSvQJN8r2vayYgu+uoOAhYIIdKIK99C8V/FnKwFCOBPpQz3fjE3oaP526h2N6MDmcrVv31kBMWFdrGUd3YN4e45yngVq5D8hWArhZA856DK9iJS0wHLi1Y8LW9wYxjqJ1lUDfnxk2rGz1LLj3BccdgGITwSebE3vxpUPeXEB9+D2WlGCO+HlQvt+LnpSbUOwcx7E4hzKmgAHgVmFo/wCATubPNZp8i5o7fTFpP6JmJo8jZPoLi+RFDgX40uNtQs9yEyegSzBxQvw+pyUnwdhuo3QqfP4L6f7zjJK/xL+07PqXs4AtITR9HxnoKw95OtK60w+JuhWvvIR4pPjqMSGMjFk+exNrly4Cmouovj0400Kf5xXOhdO+L2LQWoN19E9W2MlxzlKNm4SLaPLWYjvaaXejYaLbA+dkZqKJ4CLVMr4IAW4RfKGSS3a+A630d961luOIoRe1CCRqY87jFFCKQnUeivQNDhCBcXwdpO34I+HXiEMASzlpoT9w+gp2eY+Amz/CjActWA1OM2+4SPIi3mJcXhuPD47C++zbm3nkL0RtV4DWgtJ/ZNgECyUa7qrmVqzfo3sQHSnrmeZbGXu7zVu3c9Zag3+/Ceipv1jPwv2RNx7VxL0ZdG0UEWo7I4hIR2WmSzzFESt8nhiGRGOc87drun5ndor/9MLMrtjj3MRk6QJ9zF6VDPq3dFr6ga+YzPQJI2XkipMaIkl0gND1DdF0gikqfEBXuGUAna6zwWt/qflndbKzlznK8fCqw84ZrM0WUvEz+A2kJIrGzbtlEAAAAAElFTkSuQmCC' height=16 width=16> "],
	[/\squeenshare.com/gi," <img alt='queenshare.com' title='queenshare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEUAAAD4tSTyuSLvtyL666X8+P77/P799+L3tSjxuh/7/fT8+/r3/u/3/vzwuxzvuSb5/v7uuSr1/fz4uBby3I3v0Wb9/f3yuCL+/Pv9+uj3/fX6/fnuux35/f78+8v8+Nz7/f3yuCX8/fz+/PTxuSH8/fD89dr9/fn9+/78+f7wuSPyuhH9/P3xuSL2/P75tCDsvRnxtTb0tyP567L7tB7vvEnpvUz++/r8sCj++evyuR/wvBjyuiLtuif++P37/PnyuB/xuCTxuCbzuBzyuiH7+/79+fzsvkv3th/zuSX+8/DwuSXtuSnzuSL2tiHvux7yuCP1tin1tib1uB70tyb1uCDzuR7uuDCunGSdkXyUkouQj5WNkZqLj52NkJaPkIybjYuwmmvftUb1txvzuB71tCX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLeCR353XRdcs7ASgFLTEAAPkBAAAAAACxAACs0AIAAuAAAAAAAAQAAAC4AAAAEvnLWi9pe3XRdcs7ASgS+bhgmQDddcv+ATES+vSqMAD6AfZ1/A37nQ/clXWM3QIAEvpIwzUhMQBUgwUAAAAS+rRPcgAlAEAASMAS+pzDNgCMAEgAEvoFLTEAAPkwAAAB9qoAAACqMAAAAfYAAAAFLTEAAPlYAAB1z2HPYUBhWHUsdc8AEvrLadBhQHUxdc/5BS0AAAAAAAAvAAF1y1rLaBAtMXUI+QUB9/dAL75FQQABAEB3PFxASPW7jwAIAEgAEvv39wj37AExAfeDBSES+wj6iADXABIASNKG5iDS3wAxAEj5BS0AAACqMACAAfYB9/f2qjD7EAHiABIASMcAAAAAAAC0AAAAEvoS+xzH7AAQAEgAEvsS+0/3OAABAfcB9qoAAAAAAQABAAApc5NYAAAAAXRSTlMAQObYZgAAAAFiS0dEca8HXOIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAC5SURBVBhXY2BkQgHMDECChZWNnYOJiZOLm4eJCSjAy8fExC8gyCQkzCQCEhAVAyoSl5BkkpKWYQIJyMqB9MorMCkqKauABFRBKpjU1IGEhqYWUEBbR5eJSUVPn8mAyVDMCGSosYKJoqkZE5O5ooUl2BYmK2sbWzt7B0cnZyaIABi4uLq5e3h6IQSYvH18Pf2QVMAASMA/IDAoODgoJDQMLBAeERkVHRMbGxMXn5CYxMSQnIICUhnQAQBJhhxzQtmxHwAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\shugefiles.net/gi," <img alt='hugefiles.net' title='hugefiles.net' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAB9klEQVQoU2P4DwN///15/uHqo7dn4SKfvr84envWkVsz3ny+Bxdk+P3nx4sP1/Ze652+z7t2nVz1OqnzD1f//ff70M2pHVsNy1cJA1HTRrVN5yu//nwL0jBhpx1QqGK1cOVa4ap1wmUrhRtW6c3ZF1WxSgTIBQoCpeDabr84wHD5yebK1eLtG0ynb42dsjpj7e4JnbPTAnIk42vUiieZVizQqlquVL1apnK12Mz9vqtO5TAAbVl4JKZ/m9OeS5MQrv/y9t3H5y/e3r/z5PThy0um7wwGalhwJOrBm5MgDStOZgDtrVgj/OPXp+vPd647m3/n5cFzD1etPpvZu9ukco1w5WqR3p2Wa04X3Hy+F6Rh+Yk0oBNr1kr/+vP95N1FQJ1Fi4SCSnmzpgt2r3O/9Gjjm8/3//3/Bw0lJA0yQPbZBysgGlxTuF0SuVdu7/uPChAagF4/+2AlMDQhGtzTuN2SueeurTt1aVfXnPStB+eiawCGIyT4kDV4pPG5pXCnN5ifurwTi5OevLu48Vw5sob22YnPXiGiGU2DNDB1nH+4BlnD8q3d/1EBSMOyE6mwUPp2+v5SZA2LN7Vi0QCMB4jridUATJUXH60HJi9gPJy4uwCiwS0VpGHhhmYsGpDBu6+P9l3vm7HHv3lmxJb9s1++fYSmAAAKHAiP0NmyOwAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\sfileparadox.in/gi," <img alt='fileparadox.in' title='fileparadox.in' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQAAAAA3iMLMAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAqSURBVAhbY2BgYKj/weAgwVD/j8FBDkQmsoFQuhpDMhsIpdtBEVCKgQEADWIKwY806VUAAAAASUVORK5CYII=' height=16 width=16> "],
	[/\snetload.in/gi," <img alt='netload.in' title='netload.in' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOXSURBVEhLvZRNTFRXFMcnbdPELlyZuHHjojEuZeHSnQuiw8fUQRnGMoBp1WpsaBNjQ4yKMCEKtgjiB1EgGm3ajda0tFIlraGJiRUzgQiIA86H4zi84X3NvO+/595hwGGoK+3L/HNy7n3nd8/9v3vHpZ10411LEAS8F/DAwMD7Aff39/9PHQsnyhDr/BKZ0VuwJoeg3Ti6VHBqJ/TLjTyyXP8hUJC/qYKOFVK8PQDx31uwtTmYUgpWKgq9MwCtlUBXGmGznKLW4oY5eD6XM/gCI6++vr4cWCUlu7+ANjUEQMPzp+PQUzFeaI78VAym/G3g7u5uuJRmNxLf+2E//Y2gIjQxgdGbV2C8isIKP+bFWgfZ0LcM/HsxWD1eCnnvp6irq4NrotUHIfQnQXXA0SH+0oX45e+4DfliFhfBFJeDs83bIH29CWrFB1DLXfD5fHCF71yDaTtwCG1ISbw4Q5bkt00QK3QXdnwSxvWmJXAwD45A7doDxbuKA/PiYGNuNgdlRkRCmA36l/wkSL5T6+HtArB2u5MWnEL2280F0EWw45jIEFRj4NgEZsiaN8EMYk38w3OmbO8h8nE99EsHYEefrAiuqamBy2ZAkkzSNREzvUcg9n6TA9MCmbYKmMOXYAtxWC/DyB4mkMcF/WIObPzcCv3CgUWxhXIdE1AipUkWSQ2PInyVXg4N04v7oLZsR6xnH6z4E8gPBzHfWMLBWpsH5r2BImlBD6qrq+GCKXAbZLLEBOsfUOJhJG4EEWmuwHTtejxq8iCbjiNNlsQ76vFq7wYI3k+KLMiLWyHdOwfbTtEHNOE4Fiw6IfSjk6chMzuGyMivmB75A7KQ5IsaqoipwWsIHd2Bud1rIVd+WATmVgjtPswPdVHLz4mWgWnadPw4o+DJ0liWItsdm7bEJFI3OxA7tnVlMLsxSrASibOfY+7vfhjRcVjKPGxdh23QpTFNxqXr40BybKgLYPY46TDUv3pWBstHtkDZtRqy5yOk9m+EdNqPZNtuvDh7kG5hD6S71yGN34dupOmsm7AcFfL0Awg/tkBtr4a4f0MRmHu8fFD97GMoJGnHKkg1ayAG1iFyshJi9AEc5RmSd7owebAE8+zjUTNF9STe8UoTy5X6aiOyw51Qrh5Com4dpIX/hP8SB4+NjaG+vh4NDQ2ora2F3+/n59Dr9cLj8aC8vJyrrKwMbrebKz/G5quqqvjWA4HAIqe0tBSvAUl6mVSM2XavAAAAAElFTkSuQmCC' height=16 width=16> "],
    [/\ssafelinking.net/gi," <img alt='safelinking.net' title='safelinking.net' src='data:image/png;base64,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' height=16 width=16> "],
    [/\sdepositfiles.com/gi," <img alt='depositfiles.com' title='depositfiles.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4jcVTQQoDQQwyZf/l12Z+pi+zp4Wl3Q5lcljBU4KKJJUEtoMNkCxIyi4k5bXjfMWzAiRRSbYK/CuBbcw5UVW3tA1ICoAvSso5WwGrBUkZQPLJq8CvBCfHGEuDgyQ6PfbvwHZPoJ2gK1BpvvMbp9LiM9jAPl8AAAAASUVORK5CYII=' height=16 width=16> "],
    [/\s[^\.]+\.?megashares.com/gi," <img alt='megashares.com' title='megashares.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPUlEQVQ4jaWQMUvDUBSFzzMvscHgKOJWOohYwaGgLTjESVwcRf0Dmdy7iJObFLciQl0CLiLoD8hWF6EIUQwOXbSDggZjSY1pnkPJM5DGBHumd8+9fPfcR9j+DMMIoixfRn9hA/7ZceLQ2OomyNJazBfr66BhwcxmIqBvNiFUGyDFShweLUixAqpbfJDqFoTdo8GC9t3wdIlrQ01M/tlOB6RoZABNGwjengAA3u0V/M977suqBjEKoLrFm0K1wd9d8xzB/BSAd6B9w3227GRMYHdA8yUoW7X/nTBe3sHXtQ77YOU34fQslO1aNoCsapDmVDB3EJn1HHQv9uAadUhZAF7rEt6DwesQlPkE1nPgRz4vPEFWNeDUAMW3C2I/Ay/WUECuUEKucBJvfHQAFoCww0XGBBGQlLQwMZHXR/wA1wRhgKBkTiEAAAAASUVORK5CYII=' height=16 width=16> "],
    [/\sryushare.com/gi," <img alt='ryushare.com' title='ryushare.com' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAABGdBTUEAALGOfPtRkwAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAhw8AAIwPAAD9UgAAgUAAAH15AADpiwAAPOUAABnMczyFdwAAAgRQTFRF////zMzM0dHR09PT0tLS09PSy8vL6+vrampqtbW1wMC/x8fQwcHTu7vUurrUwMDUxsbQy8vMyMjIwMDAkJCQxcXFw8PDgYGBEhIRDQ0iREUAdXQAkpMAmZkAfX0AUE8ABAQgIiIiGBgYb29vsLCwbm5uLCwwfHxj6elb9PUAzs41ra1d//9T//8A2NgKJSVGODg4VVVVZGRktLS0cHBwMTExICAmIyM6//8HlpZGBQUfAAAr1NFDTExUNDQ1V1dXaGhos7OzMzMzOTk7VFde//8Jo6VnJycyFhY83NxD3Nx7Hh4yODg3t7a2Nzc5WFti//8LqqdsPT5L0dVawciGBAMhPDw7Nzc3aWlpurm5b3BwMjIyOjo8MDk7/9gAaVsvNDw//+UB2qUJGio+PTw8bGxsvb29Ozo8Ljs6/54AhXkpDxMvhoJC/4UAl3kgHic9cG9vwL+/bW1tNjc6XWBZ/3wAxK9dIyczJjND+7NP/2gAlYltHSAmdHNzMDAwODc8aW1G//95UldiNTU2LCwvaXVw/9EM//9kUVNlTU1NdnZ2ycfHgYKCPz8/FBQUEBAWAAAACwsLFhYVAAABFyI1FBQTh4eHenl5urq67u7um5qaX19ffn5+i4qKVVNTTUxMTk1NUVBQfXx8iYqKuLi4z8/Prq6urKysra2tr6+vwsLC7+/vrj8e3QAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAD5SURBVAjXY2BgYGRiZmFlZWVhZmFjZwACDk4ubh5ePn4BQSFhEVEGBjFxCUkpaRlZOXkFRSUOZQYGFVU1dQ1NLW0dXT19A0MjBgZjE1MzcwtLK2sbXVs7ewcGBkcTJ2cXVzd3D08vbx+QgK+qk59/QGBQcEhoWLh9BANDZFR0TGxcfEJiUnJKuH0qA0OaqlN6RmZWdk5uXr6PfQEDQ2GRU3FJaVl5RWVVdY19LdAdqXX1DY1NzS2tbe0dnV0MDN09vX39Eyb2TZo8ZcLUaSZAh02fwQADM2fNBpJz5s6bv6Czs3NB58JFi5eAxJcuW74CBJavXLWagQEAtVRFG2DH6FIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDUtMDlUMDA6MDc6NDArMDg6MDAD0kyHAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTA1LTA5VDAwOjA3OjQwKzA4OjAwco/0OwAAAABJRU5ErkJggg==' height=16 width=16> "],
	[/\swarez-bb.org/gi,""],
	];

for(var i=0;i<spans.length-1;i++)
{
	if(spans[i].className == "description")
	{
		for(var z=0;z<hostIcons.length;z++)
		{
			spans[i].innerHTML = spans[i].innerHTML.replace(hostIcons[z][0],hostIcons[z][1]);
            spans[i].innerHTML = spans[i].innerHTML.replace(/topictitle\"\>\[[^\]]*\]\s?/gi,'topictitle">');
        }
        
	}
}