import { Resolver, Query, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { BibliaService } from '../../modules/biblia/application/biblia.service';

@Resolver('Biblia')
export class BibliaResolver {
  constructor(@Inject(BibliaService) private bibliaService: BibliaService) {}

  @Query()
  async livro(@Args('slug') slug: string) {
    return this.bibliaService.buscarPorSlug(slug);
  }

  @Query()
  async capitulo(
    @Args('livroId') livroId: string,
    @Args('numero', { type: () => Int }) numero: number,
  ) {
    return this.bibliaService.buscarCapitulo(livroId, numero);
  }

  @Query()
  async versiculo(
    @Args('livroId') livroId: string,
    @Args('capitulo', { type: () => Int }) capitulo: number,
    @Args('versiculo', { type: () => Int }) versiculo: number,
    @Args('traducaoId', { nullable: true }) traducaoId?: string,
  ) {
    return this.bibliaService.buscarVersiculo(livroId, capitulo, versiculo, traducaoId);
  }

  @Query()
  async buscarTexto(@Args('consulta') consulta: string) {
    return this.bibliaService.pesquisar(consulta);
  }

  @ResolveField()
  async capitulos(@Parent() livro) {
    return this.bibliaService.listarCapitulos(livro.id);
  }
}
