import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765106669314 implements MigrationInterface {
    name = 'Migration1765106669314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_artists" ("favoriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_912c482c1c1efd6cfe236b07a24" PRIMARY KEY ("favoriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7478d50094b850e25a796eae54" ON "fav_artists" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21e66697c43b6d290c5399b2ed" ON "fav_artists" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "fav_albums" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_f52e2723598d1a8a9556e48afca" PRIMARY KEY ("favoriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2e8982b0d19dd4c4a118325a8" ON "fav_albums" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac4dea5b76301b78dff5694082" ON "fav_albums" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "fav_tracks" ("favoriteId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_f64b84c6b9ae9632f4a5bb64418" PRIMARY KEY ("favoriteId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4eee2eeff3933a820f269bd6ba" ON "fav_tracks" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cbd129a698f44ddd3ef98e73e7" ON "fav_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_artists" ADD CONSTRAINT "FK_7478d50094b850e25a796eae542" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_artists" ADD CONSTRAINT "FK_21e66697c43b6d290c5399b2ed9" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_albums" ADD CONSTRAINT "FK_e2e8982b0d19dd4c4a118325a8e" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_albums" ADD CONSTRAINT "FK_ac4dea5b76301b78dff5694082c" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" ADD CONSTRAINT "FK_4eee2eeff3933a820f269bd6ba4" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" ADD CONSTRAINT "FK_cbd129a698f44ddd3ef98e73e72" FOREIGN KEY ("tracksId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav_tracks" DROP CONSTRAINT "FK_cbd129a698f44ddd3ef98e73e72"`);
        await queryRunner.query(`ALTER TABLE "fav_tracks" DROP CONSTRAINT "FK_4eee2eeff3933a820f269bd6ba4"`);
        await queryRunner.query(`ALTER TABLE "fav_albums" DROP CONSTRAINT "FK_ac4dea5b76301b78dff5694082c"`);
        await queryRunner.query(`ALTER TABLE "fav_albums" DROP CONSTRAINT "FK_e2e8982b0d19dd4c4a118325a8e"`);
        await queryRunner.query(`ALTER TABLE "fav_artists" DROP CONSTRAINT "FK_21e66697c43b6d290c5399b2ed9"`);
        await queryRunner.query(`ALTER TABLE "fav_artists" DROP CONSTRAINT "FK_7478d50094b850e25a796eae542"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbd129a698f44ddd3ef98e73e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4eee2eeff3933a820f269bd6ba"`);
        await queryRunner.query(`DROP TABLE "fav_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac4dea5b76301b78dff5694082"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2e8982b0d19dd4c4a118325a8"`);
        await queryRunner.query(`DROP TABLE "fav_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21e66697c43b6d290c5399b2ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7478d50094b850e25a796eae54"`);
        await queryRunner.query(`DROP TABLE "fav_artists"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
