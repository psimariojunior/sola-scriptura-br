import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';
import { PushSubscription } from '../domain/push-subscription.entity';

const VERSICULOS_DIARIOS = [
  { ref: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Salmos 23:1', texto: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Filipenses 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' },
  { ref: 'Jeremias 29:11', texto: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
  { ref: 'Isaías 40:31', texto: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
  { ref: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Mateus 11:28', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: '2 Timóteo 1:7', texto: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { ref: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: '1 Coríntios 10:13', texto: 'Não vos sobreveio tentação que não fosse humana; mas Deus é fiel, e não deixará que sejais tentados acima do que podeis.' },
  { ref: 'Romanos 12:2', texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' },
  { ref: 'Salmos 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.' },
  { ref: 'Tiago 1:5', texto: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto, e ser-lhe-á dada.' },
  { ref: 'Mateus 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
  { ref: 'Gálatas 5:22-23', texto: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
  { ref: 'Colossenses 3:23', texto: 'E, tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.' },
  { ref: '1 Pedro 5:7', texto: 'Lançando sobre ele todo o vosso cuidado, porque ele mesmo cuida de vós.' },
  { ref: 'Salmos 91:1', texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Josué 1:9', texto: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { ref: 'Lamentações 3:22-23', texto: 'As misericórdias do Senhor são a causa de não sermos consumidos; as suas misericórdias são novas a cada manhã.' },
  { ref: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.' },
  { ref: 'Romanos 15:13', texto: 'Ora o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.' },
  { ref: 'Efésios 6:10', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' },
];

const LEMBRETES_STREAK = [
  { ref: 'Hebreus 12:1', texto: 'Portanto, nós também, pois temos tal nuvem de testemunhas ao redor de nós, deixemos todo o peso e o pecado que nos assedia, e corramos com paciência a carreira que nos está posta diante.' },
  { ref: '1 Coríntios 9:24', texto: 'Não sabeis que os que correm na pista, todos certamente correm, mas somente um recebe o prêmio? Assim correi, para que o alcanceis.' },
  { ref: 'Filipenses 3:13-14', texto: 'Irmãos, eu não me julgo já haver alcançado; mas uma coisa faço: esquecendo-me das coisas que ficam atrás e procurando as que estão adiante, prossigo para o alvo, para o prêmio da soberana vocação de Deus em Cristo Jesus.' },
  { ref: 'Josué 1:8', texto: 'Não se aparte deste livro da lei da tua boca, mas medita nele dia e noite, para que guardes e faças segundo tudo o que nele está escrito; porque então farás prosperar o teu caminho, e então terás êxito.' },
  { ref: '2 Timóteo 2:15', texto: 'Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.' },
];

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(PushSubscription)
    private readonly subscriptionRepo: Repository<PushSubscription>,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.configurarWebPush();
  }

  private configurarWebPush() {
    const vapidPublicKey = this.configService.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = this.configService.get('VAPID_PRIVATE_KEY');
    const vapidEmail = this.configService.get('VAPID_EMAIL', 'mailto:solascripturabr@gmail.com');

    if (!vapidPublicKey || !vapidPrivateKey) {
      this.logger.warn('⚠️ VAPID keys não configuradas. Push notifications desabilitadas.');
      this.logger.warn('Configure VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY no .env');
      return;
    }

    webpush.setVapidDetails(
      vapidEmail,
      vapidPublicKey,
      vapidPrivateKey,
    );

    this.logger.log('✅ Web Push configurado com sucesso');
  }

  async salvarSubscription(
    usuarioId: string | null,
    endpoint: string,
    p256dh: string,
    auth: string,
    userAgent?: string,
    plataforma?: string,
  ): Promise<PushSubscription> {
    const existente = await this.subscriptionRepo.findOne({
      where: { endpoint },
    });

    if (existente) {
      existente.usuarioId = usuarioId || existente.usuarioId;
      existente.p256dh = p256dh;
      existente.auth = auth;
      existente.userAgent = userAgent || existente.userAgent;
      existente.plataforma = plataforma || existente.plataforma;
      existente.ativo = true;
      return this.subscriptionRepo.save(existente);
    }

    const subscription = this.subscriptionRepo.create({
      usuarioId,
      endpoint,
      p256dh,
      auth,
      userAgent,
      plataforma,
      ativo: true,
    });

    return this.subscriptionRepo.save(subscription);
  }

  async removerSubscription(endpoint: string): Promise<void> {
    await this.subscriptionRepo.update(
      { endpoint },
      { ativo: false },
    );
  }

  async listarSubscriptionsAtivas(): Promise<PushSubscription[]> {
    return this.subscriptionRepo.find({
      where: { ativo: true },
    });
  }

  async listarSubscriptionsPorUsuario(usuarioId: string): Promise<PushSubscription[]> {
    return this.subscriptionRepo.find({
      where: { usuarioId, ativo: true },
    });
  }

  async enviarPushParaSubscription(
    subscription: PushSubscription,
    titulo: string,
    corpo: string,
    tag: string,
    url: string,
    opcoes?: Record<string, unknown>,
  ): Promise<boolean> {
    if (!this.configService.get('VAPID_PUBLIC_KEY')) {
      this.logger.warn('VAPID não configurado, ignorando envio');
      return false;
    }

    const payload = JSON.stringify({
      title: titulo,
      body: corpo,
      tag,
      data: { url },
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      actions: [
        { action: 'open-bible', title: 'Abrir Bíblia' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      vibrate: [200, 100, 200],
      ...opcoes,
    });

    try {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        payload,
      );

      await this.subscriptionRepo.update(subscription.id, {
        ultimoPushEnviado: new Date(),
        totalPushesEnviados: subscription.totalPushesEnviados + 1,
      });

      return true;
    } catch (error: any) {
      this.logger.error(`Erro ao enviar push: ${error.message}`);

      if (error.statusCode === 404 || error.statusCode === 410) {
        this.logger.log(`Subscription expirada, removendo: ${subscription.endpoint}`);
        await this.removerSubscription(subscription.endpoint);
      }

      return false;
    }
  }

  async enviarVersiculoDiario(usuarioId?: string): Promise<{ enviados: number; falhas: number }> {
    const subscriptions = usuarioId
      ? await this.listarSubscriptionsPorUsuario(usuarioId)
      : await this.listarSubscriptionsAtivas();

    if (subscriptions.length === 0) {
      return { enviados: 0, falhas: 0 };
    }

    const hoje = new Date();
    const diaDoAno = Math.floor(
      (hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / 86400000,
    );
    const versiculo = VERSICULOS_DIARIOS[diaDoAno % VERSICULOS_DIARIOS.length];

    let enviados = 0;
    let falhas = 0;

    for (const sub of subscriptions) {
      const sucesso = await this.enviarPushParaSubscription(
        sub,
        `📖 ${versiculo.ref}`,
        versiculo.texto,
        'ssb-daily-verse',
        '/biblia',
      );
      if (sucesso) enviados++;
      else falhas++;
    }

    this.logger.log(`Versículo diário: ${enviados} enviados, ${falhas} falhas`);
    return { enviados, falhas };
  }

  async enviarLembreteStreak(usuarioId: string, streak: number): Promise<boolean> {
    const subscriptions = await this.listarSubscriptionsPorUsuario(usuarioId);

    if (subscriptions.length === 0) {
      return false;
    }

    const textoStreak = streak > 0
      ? `🔥 ${streak} dias de sequência! Não pare agora.`
      : '📖 Que tal ler um versículo hoje?';

    const lembrete = LEMBRETES_STREAK[Math.floor(Math.random() * LEMBRETES_STREAK.length)];

    let enviado = false;
    for (const sub of subscriptions) {
      const sucesso = await this.enviarPushParaSubscription(
        sub,
        '🔥 Lembrete de Leitura',
        `${textoStreak}\n\n"${lembrete.texto}" — ${lembrete.ref}`,
        'ssb-streak-reminder',
        '/biblia',
      );
      if (sucesso) enviado = true;
    }

    return enviado;
  }

  async enviarNotificacaoTeste(endpoint?: string): Promise<{ sucesso: number; falhas: number }> {
    let subscriptions: PushSubscription[];

    if (endpoint) {
      const sub = await this.subscriptionRepo.findOne({ where: { endpoint } });
      subscriptions = sub ? [sub] : [];
    } else {
      subscriptions = await this.listarSubscriptionsAtivas();
    }

    if (subscriptions.length === 0) {
      return { sucesso: 0, falhas: 0 };
    }

    let sucesso = 0;
    let falhas = 0;

    for (const sub of subscriptions) {
      const resultado = await this.enviarPushParaSubscription(
        sub,
        '✅ Notificação de Teste',
        'Se você está vendo isto, as notificações estão funcionando!',
        'ssb-test-notification',
        '/biblia',
      );
      if (resultado) sucesso++;
      else falhas++;
    }

    return { sucesso, falhas };
  }

  async obterEstatisticas(): Promise<{
    totalAtivas: number;
    totalInativas: number;
    ultimaSemana: number;
  }> {
    const totalAtivas = await this.subscriptionRepo.count({
      where: { ativo: true },
    });

    const totalInativas = await this.subscriptionRepo.count({
      where: { ativo: false },
    });

    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);

    const ultimaSemana = await this.subscriptionRepo.count({
      where: {
        criadoEm: LessThan(umaSemanaAtras),
        ativo: true,
      },
    });

    return { totalAtivas, totalInativas, ultimaSemana };
  }
}
