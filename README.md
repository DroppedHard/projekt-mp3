# projekt-mp3
Odtwarzacz albumów z plikami mp3. <b>Zalecam uruchamianie programu na Firefoxie albo Microsoft Edge (maksymalny czas utworu wyświetla się bez problemów)</b><br>
# Pierwsze uruchomienie:
Aby program mógł działać należy zainstalować node.js -> https://nodejs.org/en/download/ <br>
<i>(warto sprawdzić poprawność instalacji poprzez wpisanie w konsoli polecenia <code>node -v</code>)</i><br>
Po zainstalowaniu node.js należy w konsoli przejść do folderu, gdzie znajduje się główny plik serwera - server.js.<br>
Z tego miejsca wpisujemy komendy:<br>
<code>npm install nedb</code>, <code>npm install formidable</code> i <code>node server</code><br>
Po uzyskaniu odpowiedzi "serwer startuje na porcie 3000" należy uruchomić przeglądarkę i wpisać w pasku wyszukiwania:<br>
<code>localhost:3000</code> albo <code>127.0.0.1:3000</code><br>
Po tym wszystkim w przeglądarce powinien uruchomić się program.
# O programie
Nowe foldery z albumami należy dodawać do folderu static/mp3.<br>
Nowy album powinien zawierać okładkę z nazwą <code>okladka.jpg</code> i utwory z rozszerzeniem <code>.mp3</code><br>
(przykład umieszczony w folderze - <b>obrazek i pliki mp3 nie są poprawnymi plikami - nie powinny działać</b>)<br>
Program nie obsługuje wszystkich błędów (tylko szkolny projekt).<br>
Jest obsługa playlisty, która jest zapisywana w bazie danych. Z playlisty nie da się usunąć utworów.<br>
Można przeskakiwać po utworze za pomocą przesuwania progres bara na środku.<br>
Aby przełączać się między albumami należy kliknąć w okładkę albumu po lewej, a potem wybieramy utwór poprzez naciśnięcie jego nazwy.<br>
Przyciski następnego utworu i poprzedniego działają zależnie od ostatnio wybranego utworu (jeśli wybrano utwór z albumu, to przeskakujemy po utworach w albumie. Jeśli wybrano utwór z playlisty, to przeskakujemy między utworami z playlisty).<br>
Aby dodać utwór do playlisty należy nacisnąć ikonkę <b>+</b> przy nazwie.<br>
# Rozwój
Projekt uznaję za zamkięty.
