export function LoadingComments() {
  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Comentários</h2>
      <div className="mb-8 text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="text-gray-600 mt-4">Carregando comentários...</p>
      </div>
    </div>
  );
}
