


Apunte 1: Para el desarrollo de este proyecto se está usando colorful comments(vscode extension), por eso aparecen símbolos extrños en los comentarios(?,*,&,~....)

#Como desplegar:
##Hacen falta 3 terminales y el xammp(apache y phpmyadmin) para que funcione correctamente la api de arduino y la página web. Terminales:

    php artisan serve --host=0.0.0.0 --port=8000
    npm run dev
    php artisan tinker
##Para poder correr y usar la base de datos se utiliza:

    php artisan migrate:fresh ||para limpiar la BdD y llevar a cabo las migraciones(estructuras de la base de datos)
    php artiasn migrate ||para solo la estructura
    php artisan migrate:fresh --seed || para lo mismo que la primera pero se le ponen datos artificiales especificados en DatabaseSeeder.php
    El que recomiendo usar es el tercero porque así se puede ver mejor el uso de la paginación y no hay que crear registros nuevos todo el tiempo
