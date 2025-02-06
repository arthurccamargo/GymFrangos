import os
import shutil
import re

# Caminhos absolutos para evitar problemas com caminhos relativos
base_dir = os.path.dirname(os.path.abspath(__file__))  # Raiz do projeto
frontend_dist_dir = os.path.join(base_dir, 'frontend', 'dist')  # Pasta dist do frontend
frontend_src_assets_dir = os.path.join(base_dir, 'frontend', 'src', 'assets')  # Pasta assets dentro de src
backend_static_dir = os.path.join(base_dir, 'backend', 'static')  # Pasta static do backend
backend_templates_dir = os.path.join(base_dir, 'backend', 'templates')  # Pasta templates do backend
index_html_path = os.path.join(backend_templates_dir, 'index.html')  # Arquivo index.html

# Verificar se a pasta dist existe
if not os.path.exists(frontend_dist_dir):
    print(f"Erro: A pasta '{frontend_dist_dir}' não foi encontrada. Execute 'npm run build' primeiro.")
    exit(1)

# 1. Limpar a pasta static do backend (se existir)
if os.path.exists(backend_static_dir):
    shutil.rmtree(backend_static_dir)
os.makedirs(backend_static_dir)

# 2. Copiar os arquivos da pasta dist do frontend para a pasta static do backend
shutil.copytree(frontend_dist_dir, backend_static_dir, dirs_exist_ok=True)

# 3. Copiar as imagens da pasta src/assets do frontend para o backend/static/assets
if os.path.exists(frontend_src_assets_dir):
    # Certifique-se de que a pasta assets exista dentro de backend/static
    backend_assets_dir = os.path.join(backend_static_dir, 'assets')
    if not os.path.exists(backend_assets_dir):
        os.makedirs(backend_assets_dir)

    # Copiar todas as imagens e arquivos da pasta assets para o backend
    for item in os.listdir(frontend_src_assets_dir):
        src = os.path.join(frontend_src_assets_dir, item)
        dst = os.path.join(backend_assets_dir, item)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)

# 4. Atualizar o index.html com os nomes dos arquivos JS, CSS e imagens gerados
def update_index_html():
    # Encontrar os arquivos JS e CSS na pasta static
    js_files = [f for f in os.listdir(os.path.join(backend_static_dir, 'assets')) if f.endswith('.js')]
    css_files = [f for f in os.listdir(os.path.join(backend_static_dir, 'assets')) if f.endswith('.css')]

    # Ler o conteúdo do index.html
    with open(index_html_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Substituir os nomes dos arquivos JS no index.html
    for js_file in js_files:
        # Usar regex para substituir qualquer arquivo JS pelo novo, considerando a tag {% static %}
        content = re.sub(
            r'\{% static \'assets\/.*?\.js\' %\}',
            f'{{% static \'assets/{js_file}\' %}}',
            content
        )

    # Substituir os nomes dos arquivos CSS no index.html
    for css_file in css_files:
        # Usar regex para substituir qualquer arquivo CSS pelo novo, considerando a tag {% static %}
        content = re.sub(
            r'\{% static \'assets\/.*?\.css\' %\}',
            f'{{% static \'assets/{css_file}\' %}}',
            content
        )

    # Escrever o conteúdo atualizado de volta no index.html
    with open(index_html_path, 'w', encoding='utf-8') as file:
        file.write(content)

update_index_html()

print("Build e deploy concluídos com sucesso!")
