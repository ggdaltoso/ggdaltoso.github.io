# Configuração de Autenticação GitHub

Para permitir que usuários comentem nos posts com suas contas do GitHub, você precisa configurar uma OAuth App no GitHub.

## Passo 1: Criar uma GitHub OAuth App

1. Acesse https://github.com/settings/developers
2. Clique em "New OAuth App"
3. Preencha os campos:
   - **Application name**: Nome do seu blog (ex: "Meu Blog")
   - **Homepage URL**: `http://localhost:3000` (para desenvolvimento)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Clique em "Register application"
5. Copie o **Client ID**
6. Clique em "Generate a new client secret" e copie o **Client Secret**

## Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edite o arquivo `.env.local` e preencha:
   ```env
   # GitHub OAuth App
   GITHUB_ID=seu_client_id_aqui
   GITHUB_SECRET=seu_client_secret_aqui
   
   # NextAuth Secret (gere com: openssl rand -base64 32)
   NEXTAUTH_SECRET=sua_chave_secreta_aleatoria
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Gere uma secret key para o NextAuth:
   ```bash
   openssl rand -base64 32
   ```

## Passo 3: Configurar para Produção

Quando for fazer deploy, você precisa atualizar a OAuth App:

1. Vá em https://github.com/settings/developers
2. Clique na sua OAuth App
3. Atualize as URLs:
   - **Homepage URL**: `https://seudominio.com`
   - **Authorization callback URL**: `https://seudominio.com/api/auth/callback/github`

4. No seu ambiente de produção, configure as variáveis:
   ```env
   NEXTAUTH_URL=https://seudominio.com
   NEXTAUTH_SECRET=chave_secreta_diferente_de_dev
   ```

## Como Funciona

1. **Login**: Usuário clica em "Login com GitHub" → é redirecionado para GitHub → autoriza o app → volta logado
2. **Comentar**: Ao comentar, o sistema usa o token OAuth do usuário para criar o comentário em nome dele na issue do GitHub
3. **Permissões**: O app solicita apenas permissão `public_repo` para criar comentários em repositórios públicos

## Segurança

- ✅ Cada usuário comenta com sua própria conta
- ✅ O token do usuário é armazenado apenas na sessão (cookie criptografado)
- ✅ Não é necessário dar seu token pessoal para usuários comentarem
- ✅ Você mantém controle total sobre as issues (pode moderar/deletar comentários)
